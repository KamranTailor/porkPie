function setOther(data) {

    let toSet = "";
    for (i in data.lines) {
        console.log(data.lines[i].name)

        const id = checkLine(data.lines[i].id);

        toSet += `<span id="${id}" class="item" onclick=>${data.lines[i].name}</span>`

    }

    document.getElementById("con").innerHTML= toSet;
}

function checkLine(name) {
    if (name == "bakerloo") {
        return "bakerloo"
    } else if (name == "central") {
        return "central"
    } else if (name == "circle") {
        return "circle"
    }  else if (name == "district") {
        return "district"
    }  else if (name == "hammersmith-city") {
        return "hammersmith-city"
    }  else if (name == "jubilee") {
        return "jubilee"
    }  else if (name == "metropolitan") {
        return "metropolitan"
    }  else if (name == "northern") {
        return "northern"
    }  else if (name == "piccadilly") {
        return "piccadilly"
    }  else if (name == "victoria") {
        return "victoria"
    }  else if (name == "waterloo-city") {
        return "waterloo-city"
    }  else {
        return "bus"
    } 
}