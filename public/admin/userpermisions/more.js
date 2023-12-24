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

async function fetchAllUsers() {
    const serverID = localStorage.getItem('serverID');
    const userID = localStorage.getItem('userID');
  
    const response = await fetch('/user/all', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ serverID, userID})
    });
    const data = await response.json();
    console.log(data)
    con(data);
}


function con(data) {
    const r = data.content
    for (i in r) {
        console.log(r[i].username, modifiedQuery)
        if (r[i].username === modifiedQuery) {
            displayData(r[i])
        }
    }
}

function displayData(user) {
    const toDisplay = `
    Name: ${user.first_name} <br>
    Second Name: ${user.second_name} <br>
    Date of Birth: ${user.dob} <br>
    Email: ${user.email} <br>
    Phone Number: ${user.phone_number} <br>
    Username: ${user.username} <br>`

    document.getElementById("det").innerHTML= toDisplay;
}

fetchAllUsers()