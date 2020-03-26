<!--
author:   Yannik Höll

email:    labruzzler@gmail.com

version:  0.0.1

language: en

narrator: US English Female

script:   https://tilk.github.io/digitaljs/main.js

@DigiSim.evalJson: @DigiSim._evalJson_(@uid,```@0```)

@DigiSim._evalJson_
<script>
function createCircuit() {
  const div = document.getElementById("json_@0");

  const json = JSON.parse(`@1`);

  const circuit = new digitaljs.Circuit(json);
  const paper = circuit.displayOn(div);
  circuit.start();
}

createCircuit();
</script>

<div id="json_@0">Loading Circuit</div>
@end


@DigiSim.evalCode: @DigiSim._evalCode_(@uid,```@0```)

@DigiSim._evalCode_
<script>
const components = [];
const wires = [];

const json = {
    devices: {},
    connectors: [],
    subcircuits: {devices: {}}
};

function pushComponent(name, inputs, outputs, pos, label, bits=1, extraJson={}) {
    components.push({
        celltype: name,
        inputs: inputs,
        outputs: outputs,
        pos: pos,
        bits: bits,
        label: label,
        extraJson: extraJson
    });
}

// standard logic gates
function AND(inputs, outputs, pos, label, bits=1) {
    pushComponent("$and", inputs, outputs, pos, label, bits);
}

function NAND(inputs, outputs, pos, label, bits=1) {
    pushComponent("$nand", inputs, outputs, pos, label, bits);
}

function OR(inputs, outputs, pos, label, bits=1) {
    pushComponent("$or", inputs, outputs, pos, label, bits);
}

function NOR(inputs, outputs, pos, label, bits=1) {
    pushComponent("$nor", inputs, outputs, pos, label, bits);
}

function XOR(inputs, outputs, pos, label, bits=1) {
    pushComponent("$xor", inputs, outputs, pos, label, bits);
}

function XNOR(inputs, outputs, pos, label, bits=1) {
    pushComponent("$xnor", inputs, outputs, pos, label, bits);
}
// --------------

// Reducing gates
function ReducingAND(input, output, pos, label, bits) {
    pushComponent("$reduce_and", [input], [output], pos, label, bits);
}

function ReducingNAND(input, output, pos, label, bits) {
    pushComponent("$reduce_nand", [input], [output], pos, label, bits);
}

function ReducingOR(input, output, pos, label, bits) {
    pushComponent("$reduce_or", [input], [output], pos, label, bits);
}

function ReducingNOR(input, output, pos, label, bits) {
    pushComponent("$reduce_nor", [input], [output], pos, label, bits);
}

function ReducingXOR(input, output, pos, label, bits) {
    pushComponent("$reduce_xor", [input], [output], pos, label, bits);
}

function ReducingXNOR(input, output, pos, label, bits) {
    pushComponent("$reduce_xnor", [input], [output], pos, label, bits);
}

// --------------

// Constant output of binary value
function NumberConstant(output, pos, label, value) {
    pushComponent("$constant", [], [output], pos, label, undefined, {constant: value});
}
// -----------------

// Unary operations
function Negator(input, output, pos, label, bitsIn, bitsOut, signed) {
    pushComponent("$neg", [input], [output], pos, label, {in: bitsIn, out: bitsOut}, {signed: signed});
}
// ----------------

// Binary arithmetic operations

function Add(inputs, output, pos, label, bitsIn, bitsOut, signed) {
    pushComponent("$add", inputs, [output], pos, label, {in1: bitsIn, in2: bitsIn, out: bitsOut}, {signed: {in1: signed, in2: signed}});
}

function Subtract(inputs, output, pos, label, bitsIn, bitsOut, signed) {
    pushComponent("$sub", inputs, [output], pos, label, {in1: bitsIn, in2: bitsIn, out: bitsOut}, {signed: {in1: signed, in2: signed}});
}

function Multiply(inputs, output, pos, label, bitsIn, bitsOut, signed) {
    pushComponent("$mul", inputs, [output], pos, label, {in1: bitsIn, in2: bitsIn, out: bitsOut}, {signed: {in1: signed, in2: signed}});
}

function Divide(inputs, output, pos, label, bitsIn, bitsOut, signed) {
    pushComponent("$div", inputs, [output], pos, label, {in1: bitsIn, in2: bitsIn, out: bitsOut}, {signed: {in1: signed, in2: signed}});
}

function Modulo(inputs, output, pos, label, bitsIn, bitsOut, signed) {
    pushComponent("$mod", inputs, [output], pos, label, {in1: bitsIn, in2: bitsIn, out: bitsOut}, {signed: {in1: signed, in2: signed}});
}

function Pow(inputs, output, pos, label, bitsIn, bitsOut, signed) {
    pushComponent("$pow", inputs, [output], pos, label, {in1: bitsIn, in2: bitsIn, out: bitsOut}, {signed: {in1: signed, in2: signed}});
}

// ---------------

// Comparison operations
function Equals(inputs, output, pos, label, bitsIn, signed) {
    pushComponent("$eq", inputs, [output], pos, label, {in1: bitsIn, in2: bitsIn}, {in1: signed, in2: signed});
}

function NotEquals(inputs, output, pos, label, bitsIn, signed) {
    pushComponent("$ne", inputs, [output], pos, label, {in1: bitsIn, in2: bitsIn}, {in1: signed, in2: signed});
}

function LessThan(inputs, output, pos, label, bitsIn, signed) {
    pushComponent("$lt", inputs, [output], pos, label, {in1: bitsIn, in2: bitsIn}, {in1: signed, in2: signed});
}

function LessThanOrEqual(inputs, output, pos, label, bitsIn, signed) {
    pushComponent("$le", inputs, [output], pos, label, {in1: bitsIn, in2: bitsIn}, {in1: signed, in2: signed});
}

function GreaterThan(inputs, output, pos, label, bitsIn, signed) {
    pushComponent("$gt", inputs, [output], pos, label, {in1: bitsIn, in2: bitsIn}, {signed: {in1: signed, in2: signed}});
}

function GreaterThanOrEqual(inputs, output, pos, label, bitsIn, signed) {
    pushComponent("$ge", inputs, [output], pos, label, {in1: bitsIn, in2: bitsIn}, {signed: {in1: signed, in2: signed}});
}

// -----------------

// Binary shift operations
function ShiftLeft(inputs, output, pos, label, bitsIn, bitsOut, signed) {
    pushComponent("$shl", inputs, [output], pos, label, {in1: bitsIn, in2: bitsIn, out: bitsOut},
        {signed: {in1: signed, in2: signed, out: signed}, fillx: false});
}

function ShiftRight(inputs, output, pos, label, bitsIn, bitsOut, signed) {
    pushComponent("$shr", inputs, [output], pos, label, {in1: bitsIn, in2: bitsIn, out: bitsOut},
        {signed: {in1: signed, in2: signed, out: signed}, fillx: false});
}

// -----------------

// Misc ------------
function Multiplexer(inputs, selInput, output, pos, label, bitsIn, bitsSel) {
    pushComponent("$mux", [...inputs, selInput], [output], pos, label, {in: bitsIn, sel: bitsSel});
}
// -----------------

// IO -------------
function Button(output, pos, label) {
    pushComponent("$button", [], [output], pos, label);
}

function Lamp(input, pos, label) {
    pushComponent("$lamp", [input], [], pos, label);
}

function NumberInput(output, pos, label, bitsOut, base) {
    pushComponent("$numentry", [], [output], pos, label, bitsOut, {numbase: base});
}

function NumberOutput(input, pos, label, bitsIn, base) {
    pushComponent("$numdisplay", [input], [], pos, label, bitsIn, {numbase: base});
}
// ---------------

function wire(from, to, label="") {
    wires.push({
        from: from,
        to: to,
        label: label
    });
}

function compToJSON(comp) {
    const standardOutput = {
        celltype: comp.celltype,
        label: comp.label,
        order: comp.pos,
        bits: comp.bits
    };

    if(comp.extraJson) {
        for(const key in comp.extraJson) {
            standardOutput[key] = comp.extraJson[key];
        }
    }

    return standardOutput;
}

function wireToJSON(wire) {
    let fromId, toId;
    let fromIndex, toIndex;
    let fromComp, toComp;



    for(const comp of components) {
        for(const varname of comp.outputs) {
            if(varname === wire.from) {
                fromIndex = comp.outputs.indexOf(varname);
                fromId = `dev${components.indexOf(comp)}`;
                fromComp = comp;
            }
        }

        for(const varname of comp.inputs) {
            if(varname === wire.to) {
                toIndex = comp.inputs.indexOf(varname);
                toId = `dev${components.indexOf(comp)}`;
                toComp = comp;
            }
        }
    }

    return {
        from: {
            id: fromId,
            port: getFromPort(fromComp, fromIndex)
        },
        to: {
            id: toId,
            port: getToPort(toComp, toIndex)
        },
        name: wire.label
    }
}

function getFromPort(component, index) {
    return "out";
}

function getToPort(component, index) {
    console.log(component, index);
    switch(component.celltype) {
        case "$lamp": case "$numdisplay":
            return "in";
        break;
        case "$mux":
            if(component.inputs.length - 1 === index) {
                return "sel";
            } else {
                return `in${index + 1}`;
            }
        default:
            return `in${index + 1}`;
        break;
    }
}

function finalizeJSON() {

    for(let i = 0; i < components.length; i++) {
        json.devices[`dev${i}`] = compToJSON(components[i], i);
    }

    for(const wire of wires) {
        json.connectors.push(wireToJSON(wire));
    }


    const div = document.getElementById("code_@0");
    const circuit = new digitaljs.Circuit(json);
    circuit.displayOn(div);
    circuit.start();
}

try {
  eval(`@1`);
} catch(err) {
  document.getElementById("code_@0").innerHTML = err;
}
</script>

<div id="code_@0">Loading Circuit</div>
@end

dark: true
-->

# DigiSim for LiaScript

Implementation of DigitalJs for Liascript
[DigitalJS Source](https://github.com/tilk/digitaljs)


## `@DigiSim.evalJson`

Put the JSON of your circuit into Markdown ticks and put the makro `@DigiSim.evalJson` at the first line of your markdown and the circuit will be evaluated and shown.

``` json @DigiSim.evalJson
{"devices":{"dev0":{"label":"s","position":{"x":0,"y":20},"celltype":"$button","propagation":0},"dev1":{"label":"r","position":{"x":155,"y":75},"celltype":"$button","propagation":0},"dev2":{"label":"q","position":{"x":480,"y":55},"celltype":"$lamp","propagation":1},"dev3":{"label":"nq","position":{"x":325,"y":0},"celltype":"$lamp","propagation":1},"dev6":{"label":"$or$_input.sv:7$1","position":{"x":310,"y":50},"celltype":"$nor","propagation":1,"bits":1},"dev7":{"label":"$or$_input.sv:8$3","position":{"x":140,"y":15},"celltype":"$nor","propagation":1,"bits":1}},"connectors":[{"from":{"id":"dev0","port":"out"},"to":{"id":"dev7","port":"in1"},"name":"s","vertices":[]},{"from":{"id":"dev1","port":"out"},"to":{"id":"dev6","port":"in1"},"name":"r","vertices":[]},{"from":{"id":"dev6","port":"out"},"to":{"id":"dev2","port":"in"},"name":"q","vertices":[]},{"from":{"id":"dev6","port":"out"},"to":{"id":"dev7","port":"in2"},"name":"q","vertices":[]},{"from":{"id":"dev7","port":"out"},"to":{"id":"dev3","port":"in"},"name":"nq","vertices":[]},{"from":{"id":"dev7","port":"out"},"to":{"id":"dev6","port":"in2"},"name":"nq","vertices":[]}],"subcircuits":{}}
```

To get the JSON of a circuit you have to visite the website if [Yosys2digitaljs](https://digitaljs.tilk.eu/) and put the [Verilog](https://en.wikipedia.org/wiki/Verilog) representation of the circuit in the text field on the website. Afterwards you have to click the save button near the timer in the upper right corner and save the JSON on your computer. The simply copy the JSON from the file into the LiaScript Document.

You can also write the JSON by hand. A document of the JSON format will also be included in this documentation.

## Multiple Circuits

It is also possible to put multiple circuits on the same site of your LiaScript document as shown below.

``` json @DigiSim.evalJson
{"devices":{"dev0":{"label":"s","position":{"x":0,"y":20},"celltype":"$button","propagation":0},"dev1":{"label":"r","position":{"x":155,"y":75},"celltype":"$button","propagation":0},"dev2":{"label":"q","position":{"x":480,"y":55},"celltype":"$lamp","propagation":1},"dev3":{"label":"nq","position":{"x":325,"y":0},"celltype":"$lamp","propagation":1},"dev6":{"label":"$or$_input.sv:7$1","position":{"x":310,"y":50},"celltype":"$nor","propagation":1,"bits":1},"dev7":{"label":"$or$_input.sv:8$3","position":{"x":140,"y":15},"celltype":"$nor","propagation":1,"bits":1}},"connectors":[{"from":{"id":"dev0","port":"out"},"to":{"id":"dev7","port":"in1"},"name":"s","vertices":[]},{"from":{"id":"dev1","port":"out"},"to":{"id":"dev6","port":"in1"},"name":"r","vertices":[]},{"from":{"id":"dev6","port":"out"},"to":{"id":"dev2","port":"in"},"name":"q","vertices":[]},{"from":{"id":"dev6","port":"out"},"to":{"id":"dev7","port":"in2"},"name":"q","vertices":[]},{"from":{"id":"dev7","port":"out"},"to":{"id":"dev3","port":"in"},"name":"nq","vertices":[]},{"from":{"id":"dev7","port":"out"},"to":{"id":"dev6","port":"in2"},"name":"nq","vertices":[]}],"subcircuits":{}}
```

``` json @DigiSim.evalJson
{"devices":{"dev0":{"label":"d","position":{"x":0,"y":32.5},"celltype":"$button","propagation":0},"dev1":{"label":"e","position":{"x":0,"y":82.5},"celltype":"$button","propagation":0},"dev2":{"label":"q","position":{"x":650,"y":67.5},"celltype":"$lamp","propagation":1},"dev3":{"label":"nq","position":{"x":495,"y":0},"celltype":"$lamp","propagation":1},"dev4":{"label":"$and$_input.sv:11$5","position":{"x":310,"y":80},"celltype":"$and","propagation":1,"bits":1},"dev5":{"label":"$and$_input.sv:12$6","position":{"x":140,"y":5},"celltype":"$and","propagation":1,"bits":1},"dev7":{"label":"$not$_input.sv:13$7","position":{"x":140,"y":100},"celltype":"$not","propagation":1,"bits":1},"dev9":{"label":"$or$_input.sv:10$3","position":{"x":310,"y":5},"celltype":"$nor","propagation":1,"bits":1},"dev10":{"label":"$or$_input.sv:9$1","position":{"x":480,"y":62.5},"celltype":"$nor","propagation":1,"bits":1}},"connectors":[{"from":{"id":"dev0","port":"out"},"to":{"id":"dev5","port":"in2"},"name":"d","vertices":[]},{"from":{"id":"dev0","port":"out"},"to":{"id":"dev7","port":"in"},"name":"d","vertices":[]},{"from":{"id":"dev1","port":"out"},"to":{"id":"dev4","port":"in1"},"name":"e","vertices":[]},{"from":{"id":"dev1","port":"out"},"to":{"id":"dev5","port":"in1"},"name":"e","vertices":[]},{"from":{"id":"dev10","port":"out"},"to":{"id":"dev2","port":"in"},"name":"q","vertices":[]},{"from":{"id":"dev10","port":"out"},"to":{"id":"dev9","port":"in2"},"name":"q","vertices":[]},{"from":{"id":"dev9","port":"out"},"to":{"id":"dev3","port":"in"},"name":"nq","vertices":[]},{"from":{"id":"dev9","port":"out"},"to":{"id":"dev10","port":"in2"},"name":"nq","vertices":[]},{"from":{"id":"dev7","port":"out"},"to":{"id":"dev4","port":"in2"},"name":"nd","vertices":[]},{"from":{"id":"dev4","port":"out"},"to":{"id":"dev10","port":"in1"},"name":"r","vertices":[]},{"from":{"id":"dev5","port":"out"},"to":{"id":"dev9","port":"in1"},"name":"s","vertices":[]}],"subcircuits":{}}
```

## `@DigiSim.evalCode`

You can also use a pseudo RTL code to define your circuit as demostrated below.

``` js
// Init components
AND(["and1", "and2"], ["and3"], 1, "AND1");
OR(["or1", "or2"], ["or3"], 1, "OR1");
XOR(["xor1", "xor2"], ["xor3"], 2, "XOR1");
Button("btn1", 0, "BUTTON1");
Button("btn2", 0, "BUTTON2");
Button("btn3", 0, "BUTTON3");
Button("btn4", 0, "BUTTON4");
Lamp("lmp1", 3, "LAMP1");

// IO IN
wire("btn1", "and1");
wire("btn2", "and2");
wire("btn3", "or1");
wire("btn4", "or2");

// AND, OR -> XOR
wire("and3", "xor1");
wire("or3", "xor2");

// IO OUT
wire("xor3", "lmp1", "Main Output");

finalizeJSON();
```

``` js @DigiSim.evalCode
// Init components
AND(["and1", "and2"], ["and3"], 1, "AND1");
OR(["or1", "or2"], ["or3"], 1, "OR1");
XOR(["xor1", "xor2"], ["xor3"], 2, "XOR1");
Button("btn1", 0, "BUTTON1");
Button("btn2", 0, "BUTTON2");
Button("btn3", 0, "BUTTON3");
Button("btn4", 0, "BUTTON4");
Lamp("lmp1", 3, "LAMP1");

// IO IN
wire("btn1", "and1");
wire("btn2", "and2");
wire("btn3", "or1");
wire("btn4", "or2");

// AND, OR -> XOR
wire("and3", "xor1");
wire("or3", "xor2");

// IO OUT
wire("xor3", "lmp1", "Main Output");

finalizeJSON();
```
