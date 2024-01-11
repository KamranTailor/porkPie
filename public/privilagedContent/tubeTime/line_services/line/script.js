// Get the query string from the current URL
const queryString = window.location.search;
console.log(queryString)

if (queryString.length === 0) {
  console.log("Query string is empty");
  window.location = './store.html'
} else {
  console.log("Query string is not empty");
}

// Check if queryString starts with a question mark
let modifiedQuery;
if (queryString.startsWith('?')) {
    // Remove the question mark and store the modified query
    modifiedQuery = queryString.substring(1);
} else {
    console.log("Query string doesn't start with a question mark");
    modifiedQuery = queryString;
}

console.log(modifiedQuery);

var formatedQuery = modifiedQuery.charAt(0).toUpperCase() + modifiedQuery.slice(1);
document.getElementById("title").innerHTML = formatedQuery;

let trainData = "";

async function getDta() {
    const response = await fetch('/tflStopPointLCO/line', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({line: modifiedQuery})
    });
    const data1 = await response.json();
    console.log(data1)

    trainData = data1.data

    updateTrainDiagram()
}

function updateTrainDiagram() {
    const diagramContainer = document.getElementById("diagram-container");
    diagramContainer.innerHTML = ""; // Clear previous positions

    let num = 0;
    trainData.forEach((train, index) => {
        num++
        const cont = `<span class="number"> ${train.vehicleId} </span> - ${train.currentLocation}`
        const trainElement = document.createElement("div");
        trainElement.className = "train";
        trainElement.innerHTML = cont;
        diagramContainer.appendChild(trainElement);
    });

    document.getElementById("subText").innerHTML= `There are curently ${num} trains on the ${formatedQuery} line`;
} 

getDta()