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

async function get() {
  const response = await fetch('/tflStopPoint/select', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: modifiedQuery})
  });
  const data = await response.json();
  console.log(data)
}

get()