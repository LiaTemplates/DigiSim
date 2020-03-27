let components = [];
let wires = [];

let json = {
    devices: {},
    connectors: [],
    subcircuits: {devices: {}}
};

const circuits = {};

function pushComponent(name, inputs, outputs, label, bits=1, extraJson={}, pos=undefined) {
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
function AND(inputs, outputs, label, bits=1, pos=undefined) {
    pushComponent("$and", inputs, outputs, label, bits, pos);
}

function NAND(inputs, outputs, label, bits=1, pos=undefined) {
    pushComponent("$nand", inputs, outputs, label, bits, pos);
}

function OR(inputs, outputs, label, bits=1, pos=undefined) {
    pushComponent("$or", inputs, outputs, label, bits, pos);
}

function NOR(inputs, outputs, label, bits=1, pos=undefined) {
    pushComponent("$nor", inputs, outputs, label, bits, pos);
}

function XOR(inputs, outputs, label, bits=1, pos=undefined) {
    pushComponent("$xor", inputs, outputs, label, bits, pos);
}

function XNOR(inputs, outputs, label, bits=1, pos=undefined) {
    pushComponent("$xnor", inputs, outputs, label, bits, pos);
}
// --------------

// Reducing gates
function ReducingAND(input, output, label, bits, pos=undefined) {
    pushComponent("$reduce_and", [input], [output], label, bits, pos);
}

function ReducingNAND(input, output, label, bits, pos=undefined) {
    pushComponent("$reduce_nand", [input], [output], label, bits, pos);
}

function ReducingOR(input, output, label, bits, pos=undefined) {
    pushComponent("$reduce_or", [input], [output], label, bits, pos);
}

function ReducingNOR(input, output, label, bits, pos=undefined) {
    pushComponent("$reduce_nor", [input], [output], label, bits, pos);
}

function ReducingXOR(input, output, label, bits, pos=undefined) {
    pushComponent("$reduce_xor", [input], [output], label, bits, pos);
}

function ReducingXNOR(input, output, label, bits, pos=undefined) {
    pushComponent("$reduce_xnor", [input], [output], label, bits, pos);
}

// --------------

// Constant output of binary value
function NumberConstant(output, label, value, pos=undefined) {
    pushComponent("$constant", [], [output], label, undefined, {constant: value}, pos);
}
// -----------------

// Unary operations
function Negator(input, output, label, bitsIn, bitsOut, signed, pos=undefined) {
    pushComponent("$neg", [input], [output], pos, label, {in: bitsIn, out: bitsOut}, {signed: signed}, pos);
}
// ----------------

// Binary arithmetic operations

function Add(inputs, output, label, bitsIn, bitsOut, signed, pos=undefined) {
    pushComponent("$add", inputs, [output], label, {in1: bitsIn, in2: bitsIn, out: bitsOut}, {signed: {in1: signed, in2: signed}}, pos);
}

function Subtract(inputs, output, label, bitsIn, bitsOut, signed, pos=undefined) {
    pushComponent("$sub", inputs, [output], label, {in1: bitsIn, in2: bitsIn, out: bitsOut}, {signed: {in1: signed, in2: signed}}, pos);
}

function Multiply(inputs, output, label, bitsIn, bitsOut, signed, pos=undefined) {
    pushComponent("$mul", inputs, [output], label, {in1: bitsIn, in2: bitsIn, out: bitsOut}, {signed: {in1: signed, in2: signed}}, pos);
}

function Divide(inputs, output, label, bitsIn, bitsOut, signed, pos=undefined) {
    pushComponent("$div", inputs, [output], label, {in1: bitsIn, in2: bitsIn, out: bitsOut}, {signed: {in1: signed, in2: signed}}, pos);
}

function Modulo(inputs, output, label, bitsIn, bitsOut, signed, pos=undefined) {
    pushComponent("$mod", inputs, [output], label, {in1: bitsIn, in2: bitsIn, out: bitsOut}, {signed: {in1: signed, in2: signed}}, pos);
}

function Pow(inputs, output, label, bitsIn, bitsOut, signed, pos=undefined) {
    pushComponent("$pow", inputs, [output], label, {in1: bitsIn, in2: bitsIn, out: bitsOut}, {signed: {in1: signed, in2: signed}}, pos);
}

// ---------------

// Comparison operations
function Equals(inputs, output, label, bitsIn, signed, pos=undefined) {
    pushComponent("$eq", inputs, [output], pos, label, {in1: bitsIn, in2: bitsIn}, {in1: signed, in2: signed}, pos);
}

function NotEquals(inputs, output, label, bitsIn, signed, pos=undefined) {
    pushComponent("$ne", inputs, [output], label, {in1: bitsIn, in2: bitsIn}, {in1: signed, in2: signed}, pos);
}

function LessThan(inputs, output, label, bitsIn, signed, pos=undefined) {
    pushComponent("$lt", inputs, [output], label, {in1: bitsIn, in2: bitsIn}, {in1: signed, in2: signed}, pos);
}

function LessThanOrEqual(inputs, output, label, bitsIn, signed, pos=undefined) {
    pushComponent("$le", inputs, [output], label, {in1: bitsIn, in2: bitsIn}, {in1: signed, in2: signed}, pos);
}

function GreaterThan(inputs, output, label, bitsIn, signed, pos=undefined) {
    pushComponent("$gt", inputs, [output], label, {in1: bitsIn, in2: bitsIn}, {signed: {in1: signed, in2: signed}}, pos);
}

function GreaterThanOrEqual(inputs, output, label, bitsIn, signed, pos=undefined) {
    pushComponent("$ge", inputs, [output], label, {in1: bitsIn, in2: bitsIn}, {signed: {in1: signed, in2: signed}}, pos);
}

// -----------------

// Binary shift operations
function ShiftLeft(inputs, output, label, bitsIn, bitsOut, signed, pos=undefined) {
    pushComponent("$shl", inputs, [output], label, {in1: bitsIn, in2: bitsIn, out: bitsOut},
        {signed: {in1: signed, in2: signed, out: signed}, fillx: false}, pos);
}

function ShiftRight(inputs, output, label, bitsIn, bitsOut, signed, pos=undefined) {
    pushComponent("$shr", inputs, [output], label, {in1: bitsIn, in2: bitsIn, out: bitsOut},
        {signed: {in1: signed, in2: signed, out: signed}, fillx: false}, pos);
}

// -----------------

// Misc ------------
function Multiplexer(inputs, selInput, output, label, bitsIn, bitsSel, pos=undefined) {
    pushComponent("$mux", [...inputs, selInput], [output], label, {in: bitsIn, sel: bitsSel}, pos);
}
// -----------------

// IO -------------
function Button(output, label, pos=undefined) {
    pushComponent("$button", [], [output], label, pos);
}

function Lamp(input, label, pos=undefined) {
    pushComponent("$lamp", [input], [], label, pos);
}

function NumberInput(output, label, bitsOut, base, pos=undefined) {
    pushComponent("$numentry", [], [output], label, bitsOut, {numbase: base}, pos);
}

function NumberOutput(input, label, bitsIn, base, pos=undefined) {
    pushComponent("$numdisplay", [input], [], label, bitsIn, {numbase: base}, pos);
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
        position: comp.pos,
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

function finalizeJSON(name) {
    for(let i = 0; i < components.length; i++) {
        json.devices[`dev${i}`] = compToJSON(components[i], i);
    }

    for(const wire of wires) {
        json.connectors.push(wireToJSON(wire));
    }

    circuits[name] = json;

    // reset state
    components = [];
    wires = [];

    json = {
        devices: {},
        connectors: [],
        subcircuits: {devices: {}}
    };
}

function insertCircuit(name, divname) {
    if(!circuits[name]) {
        throw new Error(`${name} is not a circuit!`);
        return;
    }

    const div = document.getElementById(divname);
    const circuit = new digitaljs.Circuit(circuits[name]);
    circuit.displayOn(div);
    circuit.start();
}
