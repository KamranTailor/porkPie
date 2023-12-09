// Get the query string from the current URL
const queryString = window.location.search;
console.log(queryString)

if (queryString.length === 0) {
  console.log("Query string is empty");
  window.location = '/'
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


async function getData(id) {
    const response = await fetch('/fn-get/fortniteCosmetics');
    const data = await response.json();
    items = data.data.data;
    console.log(items)

    for (i in items) {
        if (id == items[i].id) {
            console.log(items[i].id)
            setData(items[i])
        }
    }
}

function setData(r) {

    const setName = ('- '+ r.name)
    document.getElementById('name').innerHTML = setName;

    let series;
    if (r.series == null) {
        series = "N/A";
    } else {
        series = r.series;
    }

    let shop;
    if (r.shopHistory == null) {
        shop = "Never been in the shop"
    } else {
        const shopHistory = r.shopHistory;
        const dates = shopHistory.map(dateString => new Date(dateString));
        dates.sort((a, b) => b - a);
        const mostRecentDate = dates[0];
        
        shop = (mostRecentDate.toISOString());
        shop = new Date(shop);
    }

    let added = r.added
    added = new Date(added);

    let set;
    if (r.set == null) {
        set = 'No Set';
    } else {
        set = r.set.text
    }
    const toSet = `
    <p><strong>Name: </strong>${r.name}</p>
    <p><strong>ID: </strong>${r.id}</p>
    <p><strong>Description: </strong>${r.description}</p>
    <p><strong>Type of Cosmetic: </strong>${r.type.value}</p>
    <p><strong>Rarity: </strong>${r.rarity.value}</p>
    <p><strong>Series: </strong>${series}</p>
    <p><strong>Set: </strong>${set}</p>
    <p><strong>Introduced: </strong>${r.introduction.text}</p>
    <p><strong>Last Released In The Item Shop: </strong>${shop}</p>
    <p><strong>Added to the Game: </strong>${added}</p>
    <br>
    <!-- Image Gallery (you can use JavaScript to implement a gallery) -->
    <h2>Image Gallery</h2>
    <div id="imageGallery">
    </div>`

    document.getElementById("setter").innerHTML= toSet;

    if (r.variants == null) {
        const style = `<img src="${r.images.icon}"alt="Skin Name" width="300" height="300">`
        document.getElementById("imageGallery").innerHTML= style;
    } else {
        let images = "";
        for (l in r.variants[0].options) {
            const f = r.variants[0].options[l];
            images +=  `<img src="${f.image}"alt="Skin Name" width="300" height="300">`
        }
    
        document.getElementById("imageGallery").innerHTML= images;
    }
}

getData(modifiedQuery)
