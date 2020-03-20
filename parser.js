function parse(repr) {
    lines = repr.split(";").map(str => str.replace("\n", " "));

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

    const index = line.indexOf("(");
    const componentName = line.slice(0, index);
    const args = line.slice(index + 1, line.length - 1).split(",");
    
    const newComponent = {
        type: componentName,
        inputs: [args[0], args[1]],
        outputs: [args[2]],
        pos: {x: parseInt(args[3]), y: parseInt(args[4])},
        label: args[5]
    }

    return newComponent;
}

function extractComponentInfo(comp, index) {
    return {type: comp.type, id: `dev${index}`, x: comp.pos.x, y: comp.pos.y, label: comp.label};
}

function parseWire(line) {

}

parse("AND(a, b, c, 100, 100, \"Test\");")