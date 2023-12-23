let data;
let arrivals;
let displayedTrains = 5; // Initial number of trains to display

const queryString = window.location.search;

if (queryString.length === 0 || !queryString.startsWith('?')) {
  console.log("Invalid query string");
  window.location = './store.html';
} else {
  console.log("Valid query string");
}

const modifiedQuery = queryString.substring(1);

async function fetchData() {
  try {
    const response = await fetch('/tflStopPoint/select', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: modifiedQuery })
    });

    const result = await response.json();
    data = result.data;
    console.log(data);

    setOther(data)
    setOne();
    await fetchArrivals();
    setTimes();
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle error (e.g., display an error message to the user)
  }
}

async function fetchArrivals() {
  try {
    const response = await fetch('/tflStopPoint/arrivals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: data.id })
    });

    const result = await response.json();

    // Sort arrivals based on departure time
    arrivals = result.resData.sort((a, b) => a.timeToStation - b.timeToStation);
    console.log(arrivals);
    return arrivals; // Return the sorted arrivals
  } catch (error) {
    console.error('Error fetching arrivals:', error);
    // Handle error (e.g., display an error message to the user)
    throw error; // Rethrow the error to be caught in the calling function
  }
}

function setTimes() {
  let toSet = "";
  for (const r of arrivals.slice(0, displayedTrains)) {
    const timeToStationSec = r.timeToStation;
    let timeToStationMinRounded = Math.round(timeToStationSec / 60);


    toSet += `<tr>
      <td>${r.destinationName}</td>
      <td>${r.lineName}</td>
      <td>${timeToStationMinRounded}</td>
    </tr>`;
  }

  document.getElementById("times").innerHTML = toSet;

  if (arrivals.length < displayedTrains) {
    document.getElementById("showMoreButton").style.display = "none";
  } else {
    document.getElementById("showMoreButton").style.display = "block";
  }
}

async function showMore() {
  displayedTrains += 5; // Increase the number of displayed trains by 5
  try {
    await fetchArrivals(); // Wait for the arrivals to be fetched
    setTimes();
    updateButtonVisibility();
  } catch (error) {
    console.error('Error showing more:', error);
  }
}

function showLess() {
  displayedTrains -= 5; // Decrease the number of displayed trains by 5
  if (displayedTrains < 5) {
    displayedTrains = 5; // Ensure a minimum of 5 trains are displayed
  }
  setTimes();
  updateButtonVisibility();
}

function updateButtonVisibility() {
  const showMoreButton = document.getElementById("showMoreButton");
  const showLessButton = document.getElementById("showLessButton");

  if (arrivals.length > displayedTrains) {
    showMoreButton.style.display = "block";
  } else {
    showMoreButton.style.display = "none";
  }

  if (displayedTrains > 5) {
    showLessButton.style.display = "block";
  } else {
    showLessButton.style.display = "none";
  }
}

function setOne() {
  const name = data.commonName;
  document.getElementById("stationName").innerHTML = name;
}

fetchData();
updateButtonVisibility();