// Assuming you have an array of stations
let stations = [];
        
async function getStations() {
    try {
         const response = await fetch("/tflStopPoint/all");
         const data = await response.json();
         stations = data.data;
         console.log(stations);
    } catch (error) {
         console.error("Error fetching stations:", error);
    }
}

function searchStations() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    const matchingStations = stations.filter(station => station.name.toLowerCase().includes(searchTerm));

    matchingStations.forEach(station => {
        const li = document.createElement('li');
        li.textContent = station.name;
        li.onclick = function() {
            const encodedStationName = encodeURIComponent(station.name);
            window.location = `./station?${station.id}`;
        };
        resultsContainer.appendChild(li);
    });
}

getStations();