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

async function getData() {
    //Get the data
    const response = await fetch('/fn-get/get_store');
    const data = await response.json();
    console.log(data)
    anlyseData(data)
}

function anlyseData(data) {
    for (i in data.content.data.featured) {
        const r = data.content.data.featured[i];
        if (r.id == modifiedQuery ) {
            console.log(r)
            displayData(r)
        }
    } 
}

function displayData(r) {
    document.getElementById("name").innerHTML = r.name;
    document.getElementById("name1").innerHTML = r.name;
    document.getElementById("des").innerHTML = r.description;
    document.getElementById("type").innerHTML = r.type;
    document.getElementById("rarity").innerHTML = r.rarity;
    document.getElementById("price").innerHTML = r.price;
    document.getElementById("lseen").innerHTML = r.history.lastSeen;
    document.getElementById("fseen").innerHTML = r.history.firstSeen;
    document.getElementById("occ").innerHTML = r.history.occurrences;

    let images = "";
    if (r.images.featured !== false) {
        images += `<img id='imgss' src="${r.images.featured}" alt="featured" width="200" height="200"> `
    }
    if (r.images.gallery !== false) {
        images += `<img id='imgss' src="${r.images.gallery}" alt="gallery" width="200" height="200"> `
    }
    if (r.images.icon !== false) {
        images += `<img id='imgss' src="${r.images.icon}" alt="icon" width="200" height="200"> `
    }
    if (r.images.png !== false) {
        images += `<img id='imgss' src="${r.images.png}" alt="icon" width="200" height="200"> `
    }

    document.getElementById("imgs").innerHTML= images;
}
getData();