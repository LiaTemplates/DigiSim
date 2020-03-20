function parse(repr) {
    const lines = repr.split(";").map(str => str.replace(/\n/g, " "));

    const jsonData = {
        width: 500,
        height: 500,
        devices: [],
        connections: []
    }

    const components = [];
    const wires = [];

    for(let line of lines) {
        if(line.length === 0) continue;

        if(!line.startsWith("wire")) {
            components.push(parseComponent(line));
        } else {
            wires.push(parseWire(line));
        }
    }

    for(let i = 0; i < components.length; i++) {
        jsonData.devices.push(extractComponentInfo(components[i], i));
    }
    
    const div1 = document.createElement("div");
    div1.className = "simcir";
    div1.innerHTML = JSON.stringify(jsonData);

    document.body.appendChild(div1);
}

function parseComponent(line) {
    line = line.replace(/ /g, "").replace(/"/g, "");

    const gateIndex = line.indexOf("(");
    const componentName = line.slice(0, gateIndex);
    
    const inputIndex = line.indexOf("[");
    const inputLength = line.indexOf("]") - inputIndex + 1;
    
    const inputData = line.slice(inputIndex, inputIndex + inputLength);

    line = line.slice(inputIndex + inputLength, line.length);

    const outputIndex = line.indexOf("[");
    const outputLength = line.indexOf("]") - outputIndex + 1;
    
    const outputData = line.slice(outputIndex, outputIndex + outputLength);

    line = line.slice(outputIndex  + outputLength + 1, line.length).replace(/\)/g, "");

    const args = line.split(",");
    
    const inputs = parseVars(inputData);
    const outputs = parseVars(outputData);

    const newComponent = {
        type: componentName,
        inputs: inputs,
        outputs: outputs,
        pos: {x: parseInt(args[0]), y: parseInt(args[1])},
        label: args[2]
    }

    return newComponent;
}

function extractComponentInfo(comp, index) {
    return {type: comp.type, id: `dev${index}`, numInputs: comp.inputs.length, x: comp.pos.x, y: comp.pos.y, label: comp.label};
}

function parseWire(line) {

}

function parseVars(varData) {
    varData.replace(/\[/g, "").replace(/\[/g, "").replace(/ /g, "");
    const varNames = varData.split(",");

    return varNames;
}

parse("AND([a, b, d], [c], 100, 100, \"Test\");")