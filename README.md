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
  const div = document.getElementById("@0");

  const json = JSON.parse(`@1`);

  const circuit = new digitaljs.Circuit(json);
  const paper = circuit.displayOn(div);
  circuit.start();
}

createCircuit();
</script>

<div id="@0">Loading Circuit</div>
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
