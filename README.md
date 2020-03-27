<!--
author:   Yannik Höll

email:    labruzzler@gmail.com

version:  0.0.1

language: en

narrator: US English Female

script:   https://tilk.github.io/digitaljs/main.js

@onload
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
})
@end

@DigiSim.evalJson: @DigiSim._evalJson(@uid,```@0```)

@DigiSim._evalJson
<script>
  document.getElementById("sim_@0").innerHTML= `<digi-sim>@1</digi-sim>`
  "LIA: stop"
</script>


<div id="sim_@0" ></div>
@end

@DigiSim.runJson: @DigiSim._evalJson(@uid,```@input```)

-->

# DigiSim for LiaScript

Implementation of DigitalJs for Liascript
[DigitalJS Source](https://github.com/tilk/digitaljs)

<digi-sim>
blablabla
</digi-sim>

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
