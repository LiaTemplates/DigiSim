<!--
author:   Yannik Höll

email:    labruzzler@gmail.com

version:  0.0.1

language: en

narrator: US English Female

import:   https://raw.githubusercontent.com/LiaTemplates/DigiSim/master/README.md

dark: true
-->

# Example for loading DigiSim from other LiaScript file

# Circuit example

`Half adder`

``` json @DigiSim.evalJson
{"devices":{"dev0":{"label":"a","type":"Button","propagation":0,"position":{"x":0,"y":37.5}},"dev1":{"label":"b","type":"Button","propagation":0,"position":{"x":0,"y":87.5}},"dev2":{"label":"d","type":"Button","propagation":0,"position":{"x":144.5078125,"y":0}},"dev3":{"label":"o","type":"Lamp","propagation":1,"position":{"x":453.03125,"y":10}},"dev4":{"label":"c","type":"Lamp","propagation":1,"position":{"x":608.03125,"y":82.5}},"dev5":{"label":"$or$fulladder.sv:28$3","type":"Or","propagation":1,"bits":1,"position":{"x":438.03125,"y":77.5}},"dev6":{"label":"ha1","type":"Subcircuit","propagation":0,"celltype":"halfadder","position":{"x":140,"y":62.5}},"dev7":{"label":"ha2","type":"Subcircuit","propagation":0,"celltype":"halfadder","position":{"x":289.015625,"y":10}}},"connectors":[{"from":{"id":"dev0","port":"out"},"to":{"id":"dev6","port":"a"},"name":"a"},{"from":{"id":"dev1","port":"out"},"to":{"id":"dev6","port":"b"},"name":"b"},{"from":{"id":"dev2","port":"out"},"to":{"id":"dev7","port":"b"},"name":"d"},{"from":{"id":"dev7","port":"o"},"to":{"id":"dev3","port":"in"},"name":"o"},{"from":{"id":"dev5","port":"out"},"to":{"id":"dev4","port":"in"},"name":"c"},{"from":{"id":"dev6","port":"c"},"to":{"id":"dev5","port":"in1"},"name":"c1"},{"from":{"id":"dev7","port":"c"},"to":{"id":"dev5","port":"in2"},"name":"c2"},{"from":{"id":"dev6","port":"o"},"to":{"id":"dev7","port":"a"},"name":"t"}],"subcircuits":{"halfadder":{"devices":{"dev0":{"label":"","type":"Input","propagation":0,"bits":1,"net":"a"},"dev1":{"label":"","type":"Input","propagation":0,"bits":1,"net":"b"},"dev2":{"label":"","type":"Output","propagation":0,"bits":1,"net":"o"},"dev3":{"label":"","type":"Output","propagation":0,"bits":1,"net":"c"},"dev4":{"label":"$and$fulladder.sv:10$2","type":"And","propagation":1,"bits":1},"dev5":{"label":"$xor$fulladder.sv:9$1","type":"Xor","propagation":1,"bits":1}},"connectors":[{"from":{"id":"dev0","port":"out"},"to":{"id":"dev4","port":"in1"},"name":"a"},{"from":{"id":"dev0","port":"out"},"to":{"id":"dev5","port":"in1"},"name":"a"},{"from":{"id":"dev1","port":"out"},"to":{"id":"dev4","port":"in2"},"name":"b"},{"from":{"id":"dev1","port":"out"},"to":{"id":"dev5","port":"in2"},"name":"b"},{"from":{"id":"dev5","port":"out"},"to":{"id":"dev2","port":"in"},"name":"o"},{"from":{"id":"dev4","port":"out"},"to":{"id":"dev3","port":"in"},"name":"c"}]}}}
```
