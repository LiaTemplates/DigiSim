<!--
author:   Yannik Höll & André Dietrich

email:    labruzzler@gmail.com & andre.dietrich@ovgu.de

version:  0.0.1

language: en

narrator: US English Female

script:   https://cdn.jsdelivr.net/gh/liaTemplates/DigiSim/js/parser.min.js
script:   https://tilk.github.io/digitaljs/main.js

@onload
// create custom html element for the circuit

customElements.define('digi-sim', class extends HTMLElement {
  constructor () {
    super()
  }
  connectedCallback () {
    this.json = JSON.parse(this.textContent)
    this.textContent = ""

    this.id_ = Math.random().toString(36)

    let div = document.createElement('div')
    div.id = this.id_
    div.style = "width: 100%; height: 400px"
    this.appendChild(div)

    this.init()
  }
  init() {
    if(!this.circuit) {
      try {
        this.circuit = new digitaljs.Circuit(this.json);
        let div = document.getElementById(this.id_);
        this.paper = this.circuit.displayOn(div);
        this.circuit.start()
      } catch (e) {
        alert(e)
        let self = this
        setTimeout(function() {self.init()}, 100)
      }
    }
  }
  disconnectedCallback () {
    if (super.disconnectedCallback) {
      super.disconnectedCallback()
    }
    this.circuit.stop()
  }
});

// predefine some circuits
Button("btn_s", "S", {x: 50, y: 165});
Button("btn_r", "R", {x: 50, y: 45});

NOR(["r", "nor1"], ["q"], "", 1, {x: 200, y: 50});
NOR(["nor2", "s"], ["q_"], "", 1, {x: 200, y: 150});

Lamp("lmp_q", "Q", {x: 350, y: 55});
Lamp("lmp_q_", "~Q", {x: 350, y: 155});

wire("btn_s", "s");
wire("btn_r", "r");
wire("q", "nor2");
wire("q_", "nor1");
wire("q", "lmp_q");
wire("q_", "lmp_q_");
finalizeJSON("sr_latch");
@end

@DigiSim.runJson: @DigiSim._evalJson(@uid,```@input```)

@DigiSim.evalJson: @DigiSim._evalJson(@uid,```@0```)

@DigiSim._evalJson
<script>
  document.getElementById("sim_@0").innerHTML= `<digi-sim>@1</digi-sim>`
  "LIA: stop"
</script>

<div id="sim_@0"></div>
@end

@DigiSim.insertCircuit: @DigiSim._insertCircuit_(@0, @uid)

@DigiSim._insertCircuit_
<script>
  insertCircuit(`@0`, `sim_insert_@1`);
  "LIA: stop"
</script>

<div id="sim_insert_@1">Loading Circuit</div>
@end

@DigiSim.eval: @DigiSim._eval_(```@0```, @uid)

@DigiSim._eval_
<script>
  eval(`@0`);

  const rand = Math.random().toString();
  finalizeJSON(`dev_${rand}`);
  insertCircuit(`dev_${rand}`, "sim_eval_@1");
  "LIA: stop"
</script>

<div id="sim_eval_@1"></div>
@end

dark: false
-->

# DigiSim for LiaScript

Implementation of DigitalJs for Liascript
[DigitalJS Source](https://github.com/tilk/digitaljs)

## `@DigiSim.evalJson`

Put the JSON of your circuit into Markdown ticks and put the makro `@DigiSim.evalJson` at the first line of your markdown and the circuit will be evaluated and shown.


``` json @DigiSim.evalJson
{
  "devices": {
    "dev0": {
      "label": "s",
      "position": {
        "x": 0,
        "y": 20
      },
      "celltype": "$button",
      "propagation": 0
    },
    "dev1": {
      "label": "r",
      "position": {
        "x": 155,
        "y": 75
      },
      "celltype": "$button",
      "propagation": 0
    },
    "dev2": {
      "label": "q",
      "position": {
        "x": 480,
        "y": 55
      },
      "celltype": "$lamp",
      "propagation": 1
    },
    "dev3": {
      "label": "nq",
      "position": {
        "x": 325,
        "y": 0
      },
      "celltype": "$lamp",
      "propagation": 1
    },
    "dev6": {
      "label": "$or$_input.sv:7$1",
      "position": {
        "x": 310,
        "y": 50
      },
      "celltype": "$nor",
      "propagation": 1,
      "bits": 1
    },
    "dev7": {
      "label": "$or$_input.sv:8$3",
      "position": {
        "x": 140,
        "y": 15
      },
      "celltype": "$nor",
      "propagation": 1,
      "bits": 1
    }
  },
  "connectors": [
    {
      "from": {
        "id": "dev0",
        "port": "out"
      },
      "to": {
        "id": "dev7",
        "port": "in1"
      },
      "name": "s",
      "vertices": []
    },
    {
      "from": {
        "id": "dev1",
        "port": "out"
      },
      "to": {
        "id": "dev6",
        "port": "in1"
      },
      "name": "r",
      "vertices": []
    },
    {
      "from": {
        "id": "dev6",
        "port": "out"
      },
      "to": {
        "id": "dev2",
        "port": "in"
      },
      "name": "q",
      "vertices": []
    },
    {
      "from": {
        "id": "dev6",
        "port": "out"
      },
      "to": {
        "id": "dev7",
        "port": "in2"
      },
      "name": "q",
      "vertices": []
    },
    {
      "from": {
        "id": "dev7",
        "port": "out"
      },
      "to": {
        "id": "dev3",
        "port": "in"
      },
      "name": "nq",
      "vertices": []
    },
    {
      "from": {
        "id": "dev7",
        "port": "out"
      },
      "to": {
        "id": "dev6",
        "port": "in2"
      },
      "name": "nq",
      "vertices": []
    }
  ],
  "subcircuits": {}
}
```

To get the JSON of a circuit you have to visite the website if
[Yosys2digitaljs](https://digitaljs.tilk.eu/) and put the
[Verilog](https://en.wikipedia.org/wiki/Verilog) representation of the circuit
in the text field on the website. Afterwards you have to click the save button
near the timer in the upper right corner and save the JSON on your computer. The
simply copy the JSON from the file into the LiaScript Document.

You can also write the JSON by hand. A document of the JSON format will also be
included in this documentation.

### Multiple Circuits

It is also possible to put multiple circuits on the same site of your LiaScript
document as shown below.


`D-Latch`
``` json @DigiSim.evalJson
{
    "devices": {
        "dev0": {
            "label": "d",
            "position": {
                "x": 0,
                "y": 32.5
            },
            "celltype": "$button",
            "propagation": 0
        },
        "dev1": {
            "label": "e",
            "position": {
                "x": 0,
                "y": 82.5
            },
            "celltype": "$button",
            "propagation": 0
        },
        "dev2": {
            "label": "q",
            "position": {
                "x": 660,
                "y": 65
            },
            "celltype": "$lamp",
            "propagation": 1
        },
        "dev3": {
            "label": "nq",
            "position": {
                "x": 660,
                "y": 10
            },
            "celltype": "$lamp",
            "propagation": 1
        },
        "dev4": {
            "position": {
                "x": 275,
                "y": 95
            },
            "celltype": "$and",
            "propagation": 1,
            "bits": 1
        },
        "dev5": {
            "position": {
                "x": 290,
                "y": -5
            },
            "celltype": "$and",
            "propagation": 1,
            "bits": 1
        },
        "dev7": {
            "position": {
                "x": 95,
                "y": 105
            },
            "celltype": "$not",
            "propagation": 1,
            "bits": 1
        },
        "dev9": {
            "position": {
                "x": 450,
                "y": 5
            },
            "celltype": "$nor",
            "propagation": 1,
            "bits": 1
        },
        "dev10": {
            "position": {
                "x": 440,
                "y": 105
            },
            "celltype": "$nor",
            "propagation": 1,
            "bits": 1
        }
    },
    "connectors": [
        {
            "from": {
                "id": "dev0",
                "port": "out"
            },
            "to": {
                "id": "dev5",
                "port": "in2"
            },
            "name": "d",
            "vertices": []
        },
        {
            "from": {
                "id": "dev0",
                "port": "out"
            },
            "to": {
                "id": "dev7",
                "port": "in"
            },
            "name": "d",
            "vertices": []
        },
        {
            "from": {
                "id": "dev1",
                "port": "out"
            },
            "to": {
                "id": "dev4",
                "port": "in1"
            },
            "name": "e",
            "vertices": []
        },
        {
            "from": {
                "id": "dev1",
                "port": "out"
            },
            "to": {
                "id": "dev5",
                "port": "in1"
            },
            "name": "e",
            "vertices": []
        },
        {
            "from": {
                "id": "dev10",
                "port": "out"
            },
            "to": {
                "id": "dev2",
                "port": "in"
            },
            "name": "q",
            "vertices": []
        },
        {
            "from": {
                "id": "dev10",
                "port": "out"
            },
            "to": {
                "id": "dev9",
                "port": "in2"
            },
            "name": "q",
            "vertices": []
        },
        {
            "from": {
                "id": "dev9",
                "port": "out"
            },
            "to": {
                "id": "dev3",
                "port": "in"
            },
            "name": "nq",
            "vertices": []
        },
        {
            "from": {
                "id": "dev9",
                "port": "out"
            },
            "to": {
                "id": "dev10",
                "port": "in2"
            },
            "name": "nq",
            "vertices": []
        },
        {
            "from": {
                "id": "dev7",
                "port": "out"
            },
            "to": {
                "id": "dev4",
                "port": "in2"
            },
            "name": "nd",
            "vertices": []
        },
        {
            "from": {
                "id": "dev4",
                "port": "out"
            },
            "to": {
                "id": "dev10",
                "port": "in1"
            },
            "name": "r",
            "vertices": []
        },
        {
            "from": {
                "id": "dev5",
                "port": "out"
            },
            "to": {
                "id": "dev9",
                "port": "in1"
            },
            "name": "s",
            "vertices": []
        }
    ],
    "subcircuits": {}
}
```

`Priority encoder`
``` json @DigiSim.evalJson
{
    "devices": {
        "dev0": {
            "label": "y",
            "position": {
                "x": 901.09375,
                "y": 191.5
            },
            "celltype": "$numdisplay",
            "propagation": 0,
            "numbase": "hex",
            "bits": 2
        },
        "dev1": {
            "label": "valid",
            "position": {
                "x": 903.109375,
                "y": 241.5
            },
            "celltype": "$lamp",
            "propagation": 1
        },
        "dev2": {
            "label": "a",
            "position": {
                "x": 0,
                "y": 120.5
            },
            "celltype": "$numentry",
            "propagation": 0,
            "numbase": "hex",
            "bits": 4
        },
        "dev3": {
            "label": "$procmux$3",
            "position": {
                "x": 603.609375,
                "y": 187.5
            },
            "celltype": "$pmux",
            "propagation": 1,
            "bits": {
                "in": 3,
                "sel": 4
            }
        },
        "dev4": {
            "label": "$procmux$4_CMP0",
            "position": {
                "x": 303.5625,
                "y": 0
            },
            "celltype": "$eq",
            "propagation": 1,
            "bits": {
                "in1": 4,
                "in2": 1
            },
            "signed": {
                "in1": false,
                "in2": false
            }
        },
        "dev5": {
            "label": "$procmux$5_CMP0",
            "position": {
                "x": 303.5625,
                "y": 60
            },
            "celltype": "$eq",
            "propagation": 1,
            "bits": {
                "in1": 3,
                "in2": 1
            },
            "signed": {
                "in1": false,
                "in2": false
            }
        },
        "dev6": {
            "label": "$procmux$6_CMP0",
            "position": {
                "x": 303.5625,
                "y": 145.5
            },
            "celltype": "$eq",
            "propagation": 1,
            "bits": {
                "in1": 2,
                "in2": 1
            },
            "signed": {
                "in1": false,
                "in2": false
            }
        },
        "dev7": {
            "position": {
                "x": 459.5859375,
                "y": 99.5
            },
            "celltype": "$busgroup",
            "propagation": 0,
            "groups": [
                1,
                1,
                1,
                1
            ]
        },
        "dev8": {
            "position": {
                "x": 453.5625,
                "y": 49.5
            },
            "celltype": "$constant",
            "propagation": 0,
            "numbase": "hex",
            "constant": "000"
        },
        "dev9": {
            "position": {
                "x": 453.5625,
                "y": 191.5
            },
            "celltype": "$constant",
            "propagation": 0,
            "numbase": "hex",
            "constant": "111"
        },
        "dev10": {
            "position": {
                "x": 453.5625,
                "y": 241.5
            },
            "celltype": "$constant",
            "propagation": 0,
            "numbase": "hex",
            "constant": "101"
        },
        "dev11": {
            "position": {
                "x": 453.5625,
                "y": 291.5
            },
            "celltype": "$constant",
            "propagation": 0,
            "numbase": "hex",
            "constant": "011"
        },
        "dev12": {
            "position": {
                "x": 453.5625,
                "y": 341.5
            },
            "celltype": "$constant",
            "propagation": 0,
            "numbase": "hex",
            "constant": "001"
        },
        "dev13": {
            "position": {
                "x": 160.8125,
                "y": 65
            },
            "celltype": "$constant",
            "propagation": 0,
            "numbase": "hex",
            "constant": "1"
        },
        "dev14": {
            "position": {
                "x": 753.609375,
                "y": 194.5
            },
            "celltype": "$busslice",
            "propagation": 0,
            "slice": {
                "first": 1,
                "count": 2,
                "total": 3
            }
        },
        "dev15": {
            "position": {
                "x": 758.34375,
                "y": 244.5
            },
            "celltype": "$busslice",
            "propagation": 0,
            "slice": {
                "first": 0,
                "count": 1,
                "total": 3
            }
        },
        "dev16": {
            "position": {
                "x": 156.078125,
                "y": 119.5
            },
            "celltype": "$busslice",
            "propagation": 0,
            "slice": {
                "first": 1,
                "count": 3,
                "total": 4
            }
        },
        "dev17": {
            "position": {
                "x": 156.078125,
                "y": 163.5
            },
            "celltype": "$busslice",
            "propagation": 0,
            "slice": {
                "first": 2,
                "count": 2,
                "total": 4
            }
        },
        "dev18": {
            "position": {
                "x": 309.5546875,
                "y": 205.5
            },
            "celltype": "$busslice",
            "propagation": 0,
            "slice": {
                "first": 3,
                "count": 1,
                "total": 4
            }
        }
    },
    "connectors": [
        {
            "from": {
                "id": "dev14",
                "port": "out"
            },
            "to": {
                "id": "dev0",
                "port": "in"
            },
            "name": "y",
            "vertices": []
        },
        {
            "from": {
                "id": "dev15",
                "port": "out"
            },
            "to": {
                "id": "dev1",
                "port": "in"
            },
            "name": "valid",
            "vertices": []
        },
        {
            "from": {
                "id": "dev2",
                "port": "out"
            },
            "to": {
                "id": "dev4",
                "port": "in1"
            },
            "name": "a",
            "vertices": []
        },
        {
            "from": {
                "id": "dev2",
                "port": "out"
            },
            "to": {
                "id": "dev16",
                "port": "in"
            },
            "name": "a",
            "vertices": []
        },
        {
            "from": {
                "id": "dev2",
                "port": "out"
            },
            "to": {
                "id": "dev17",
                "port": "in"
            },
            "name": "a",
            "vertices": []
        },
        {
            "from": {
                "id": "dev2",
                "port": "out"
            },
            "to": {
                "id": "dev18",
                "port": "in"
            },
            "name": "a",
            "vertices": []
        },
        {
            "from": {
                "id": "dev8",
                "port": "out"
            },
            "to": {
                "id": "dev3",
                "port": "in0"
            },
            "vertices": []
        },
        {
            "from": {
                "id": "dev7",
                "port": "out"
            },
            "to": {
                "id": "dev3",
                "port": "sel"
            },
            "vertices": []
        },
        {
            "from": {
                "id": "dev3",
                "port": "out"
            },
            "to": {
                "id": "dev14",
                "port": "in"
            },
            "vertices": []
        },
        {
            "from": {
                "id": "dev3",
                "port": "out"
            },
            "to": {
                "id": "dev15",
                "port": "in"
            },
            "vertices": []
        },
        {
            "from": {
                "id": "dev9",
                "port": "out"
            },
            "to": {
                "id": "dev3",
                "port": "in1"
            },
            "vertices": []
        },
        {
            "from": {
                "id": "dev10",
                "port": "out"
            },
            "to": {
                "id": "dev3",
                "port": "in2"
            },
            "vertices": []
        },
        {
            "from": {
                "id": "dev11",
                "port": "out"
            },
            "to": {
                "id": "dev3",
                "port": "in3"
            },
            "vertices": []
        },
        {
            "from": {
                "id": "dev12",
                "port": "out"
            },
            "to": {
                "id": "dev3",
                "port": "in4"
            },
            "vertices": []
        },
        {
            "from": {
                "id": "dev13",
                "port": "out"
            },
            "to": {
                "id": "dev4",
                "port": "in2"
            },
            "vertices": []
        },
        {
            "from": {
                "id": "dev13",
                "port": "out"
            },
            "to": {
                "id": "dev5",
                "port": "in2"
            },
            "vertices": []
        },
        {
            "from": {
                "id": "dev13",
                "port": "out"
            },
            "to": {
                "id": "dev6",
                "port": "in2"
            },
            "vertices": []
        },
        {
            "from": {
                "id": "dev4",
                "port": "out"
            },
            "to": {
                "id": "dev7",
                "port": "in3"
            },
            "vertices": []
        },
        {
            "from": {
                "id": "dev16",
                "port": "out"
            },
            "to": {
                "id": "dev5",
                "port": "in1"
            },
            "vertices": []
        },
        {
            "from": {
                "id": "dev5",
                "port": "out"
            },
            "to": {
                "id": "dev7",
                "port": "in2"
            },
            "vertices": []
        },
        {
            "from": {
                "id": "dev17",
                "port": "out"
            },
            "to": {
                "id": "dev6",
                "port": "in1"
            },
            "vertices": []
        },
        {
            "from": {
                "id": "dev6",
                "port": "out"
            },
            "to": {
                "id": "dev7",
                "port": "in1"
            },
            "vertices": []
        },
        {
            "from": {
                "id": "dev18",
                "port": "out"
            },
            "to": {
                "id": "dev7",
                "port": "in0"
            },
            "vertices": []
        }
    ],
    "subcircuits": {}
}
```

## `@DigiSim.runJson`

``` json
{
  "devices": {
    "dev0": {
      "label": "s",
      "position": {
        "x": 0,
        "y": 20
      },
      "celltype": "$button",
      "propagation": 0
    },
    "dev1": {
      "label": "r",
      "position": {
        "x": 155,
        "y": 75
      },
      "celltype": "$button",
      "propagation": 0
    },
    "dev2": {
      "label": "q",
      "position": {
        "x": 480,
        "y": 55
      },
      "celltype": "$lamp",
      "propagation": 1
    },
    "dev3": {
      "label": "nq",
      "position": {
        "x": 325,
        "y": 0
      },
      "celltype": "$lamp",
      "propagation": 1
    },
    "dev6": {
      "label": "$or$_input.sv:7$1",
      "position": {
        "x": 310,
        "y": 50
      },
      "celltype": "$nor",
      "propagation": 1,
      "bits": 1
    },
    "dev7": {
      "label": "$or$_input.sv:8$3",
      "position": {
        "x": 140,
        "y": 15
      },
      "celltype": "$nor",
      "propagation": 1,
      "bits": 1
    }
  },
  "connectors": [
    {
      "from": {
        "id": "dev0",
        "port": "out"
      },
      "to": {
        "id": "dev7",
        "port": "in1"
      },
      "name": "s",
      "vertices": []
    },
    {
      "from": {
        "id": "dev1",
        "port": "out"
      },
      "to": {
        "id": "dev6",
        "port": "in1"
      },
      "name": "r",
      "vertices": []
    },
    {
      "from": {
        "id": "dev6",
        "port": "out"
      },
      "to": {
        "id": "dev2",
        "port": "in"
      },
      "name": "q",
      "vertices": []
    },
    {
      "from": {
        "id": "dev6",
        "port": "out"
      },
      "to": {
        "id": "dev7",
        "port": "in2"
      },
      "name": "q",
      "vertices": []
    },
    {
      "from": {
        "id": "dev7",
        "port": "out"
      },
      "to": {
        "id": "dev3",
        "port": "in"
      },
      "name": "nq",
      "vertices": []
    },
    {
      "from": {
        "id": "dev7",
        "port": "out"
      },
      "to": {
        "id": "dev6",
        "port": "in2"
      },
      "name": "nq",
      "vertices": []
    }
  ],
  "subcircuits": {}
}
```
@DigiSim.runJson

## `@DigiSim.insertCircuit(name)`

Using the `@onload`-macro you cant predefine circuits which can later be inserted into the document with the `@DigiSim.insertCircuit(name)` macro by giving the name of the circuit.

@DigiSim.insertCircuit(sr_latch)

## `@DigiSim.eval`

You can also use a pseudo RTL code to define your circuit as demostrated below.

<p style="color: red">__Don't__ use the `finalizeJSON(name)` function in the code, or your circuit will not be shown!</p>

``` js
// Init components
AND(["and1", "and2"], ["and3"], "AND1");
OR(["or1", "or2"], ["or3"], "OR1");
XOR(["xor1", "xor2"], ["xor3"], "XOR1");
Button("btn1", "BUTTON1");
Button("btn2", "BUTTON2");
Button("btn3", "BUTTON3");
Button("btn4", "BUTTON4");
Lamp("lmp1", "LAMP1");

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
```

``` js @DigiSim.eval
// Init components
AND(["and1", "and2"], ["and3"], "AND1");
OR(["or1", "or2"], ["or3"], "OR1");
XOR(["xor1", "xor2"], ["xor3"], "XOR1");
Button("btn1", "BUTTON1");
Button("btn2", "BUTTON2");
Button("btn3", "BUTTON3");
Button("btn4", "BUTTON4");
Lamp("lmp1", "LAMP1");

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
```

# Js Docs
To create a circuit you have to call some functions to create components for your circuit and then you can connect them with the `wire(outpurname, inputname, label)` function.
To save your circuit you must call the `finalizeJSON(name)` function, which saves a json representation of your circuit and resests the global state so that you can create the next circuit.

Example:

``` js
@onload
Button("btn1", "");
Button("btn2", "");
Button("btn3", "");
Button("btn4", "");

AND(["and1", "and2"], ["and3"], "AND1");
OR(["or1", "or2"], ["or3"], "OR1");
XOR(["xor1", "xor2"], ["xor3"], "XOR1");

Lamp("lmp1", "Main Output");

wire("btn1", "and1", "");
wire("btn2", "and2", "");
wire("btn3", "or1", "");
wire("btn4", "or2", "");

wire("and3", "xor1", "");
wire("or3", "xor2", "");

wire("xor3", "lmp1", "");
finalizeJSON("ex1");
@end
```

If you use the `@DigiSim.eval`-macro you <b style="color: #ff0000">dont</b> have to use the `finalizeJSON(name)` to save your circuit! If you use it in the code it will not display your circuit!

## Simple Logic Gates

You can simply use this functions to create logic gates in your circuits.

<p>`inputs`:   Array of strings with the name of your inputs.        `type: [String]`</p>
<p>`outputs`:  Array of strings with the name of your outputs.       `type: [String]`</p>
<p>`label`:    Name that will be displayed next to the component.    `type: String`</p>
<p>`bits`:     Size of your data bus in bits.                        `type: Int`</p>
<p>`pos`:      Position of the circuit.                              `type: {x: Int, y: Int}`</p>

All of these parameters are the same for the upcoming functions.
<p style="color: red">If the parameter is called `input` instead of `inputs` it is not an array of strings but a single string. The same apllies to `output` and `outputs`.</p>

``` js
AND(inputs, outputs, label, bits=1, pos=undefined);
NAND(inputs, outputs, label, bits=1, pos=undefined);
OR(inputs, outputs, label, bits=1, pos=undefined);
NOR(inputs, outputs, label, bits=1, pos=undefined);
XOR(inputs, outputs, label, bits=1, pos=undefined);
XNOR(inputs, outputs, label, bits=1, pos=undefined);
NOT(inputs, outputs, label, bits=1, pos=undefined);
```

## Reducing Gates

These gates take a bus of the given bit size and reduce its size to 1 bit.

``` js
ReducingAND(input, output, label, bits, pos=undefined)
ReducingNAND(input, output, label, bits, pos=undefined)
ReducingOR(input, output, label, bits, pos=undefined)
ReducingNOR(input, output, label, bits, pos=undefined)
ReducingXOR(input, output, label, bits, pos=undefined)
ReducingXNOR(input, output, label, bits, pos=undefined) // does currently not work properly and produces a reducing xor gate
```

## IO

Components that can handle input/output operations.

<p>`bitsIn/bitsOut`:  Determines the bus size only of the input/output of the component.       `type: Int`</p>
<p>`base`:  Base of the number system the should be used       `possible values: "hex", "bin", "oct"`</p>
<p>`value`: Numeric value that is constantly output by the component. `type: Int`</p>

``` js
Button(output, label, pos=undefined)
Lamp(input, label, pos=undefined)
NumberInput(output, label, bitsOut, base, pos=undefined)
NumberOutput(input, label, bitsIn, base, pos=undefined)
NumberConstant(output, label, value, pos=undefined)
```

## Unary Operations

Unary operations that can be performed on numbers.

<p>`signed`: Determines wheter the numbers are signed or unsigned. `type: Boolean`</p>

```js
Negator(input, output, label, bitsIn, bitsOut, signed, pos=undefined)
```

## Binary Operations

Binary operations that can be performed on numbers.

``` js
Add(inputs, output, label, bitsIn, bitsOut, signed, pos=undefined)
Subtract(inputs, output, label, bitsIn, bitsOut, signed, pos=undefined)
Multiply(inputs, output, label, bitsIn, bitsOut, signed, pos=undefined)
Divide(inputs, output, label, bitsIn, bitsOut, signed, pos=undefined)
Modulo(inputs, output, label, bitsIn, bitsOut, signed, pos=undefined)
Pow(inputs, output, label, bitsIn, bitsOut, signed, pos=undefined)
```

## Comparison Operations

Comparison operations that can be performed on numbers.

``` js
Equals(inputs, output, label, bitsIn, signed, pos=undefined)
NotEquals(inputs, output, label, bitsIn, signed, pos=undefined)
LessThan(inputs, output, label, bitsIn, signed, pos=undefined)
LessThanOrEqual(inputs, output, label, bitsIn, signed, pos=undefined)
GreaterThan(inputs, output, label, bitsIn, signed, pos=undefined)
GreaterThanOrEqual(inputs, output, label, bitsIn, signed, pos=undefined)
```

## Shift Operations

Shift operations that can be performed on numbers.

``` js
ShiftLeft(inputs, output, label, bitsIn, bitsOut, signed, pos=undefined)
ShiftRight(inputs, output, label, bitsIn, bitsOut, signed, pos=undefined)
```

## Multiplexer


<p>`bitsSel`: Determines the bus size of the select input. `type: Int` </p>

`Number of inputs: 2 ^ bitSel`

``` js
Multiplexer(inputs, selInput, output, label, bitsIn, bitsSel, pos=undefined)
```
