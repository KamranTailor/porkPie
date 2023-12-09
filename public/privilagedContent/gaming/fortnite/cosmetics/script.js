let items = "";

async function onStart() {
    const response = await fetch('/fn-get/fortniteCosmetics');
    const data = await response.json();
    items = data.data.data;
    console.log(items)
}

function searchItems() {
    // Get the search query from the input
    const query = document.getElementById('searchBar').value.toLowerCase();

    // Filter items based on the search query
    const results = items.filter(item =>
        item.name.toLowerCase().includes(query)
    );

    // Display the search results
    displayResults(results);
}

// Function to display search results
function displayResults(results) {
    const searchResultsContainer = document.getElementById('searchResults');

    // Clear previous results
    searchResultsContainer.innerHTML = '';

// Display each result
results.forEach(result => {
    // Create an anchor element
    const anchorElement = document.createElement('a');

    // Set the href attribute for the anchor element
    anchorElement.href = `./more?${result.id}`; // You should replace '#' with the actual link you want

    // Create a div element for the result
    const resultElement = document.createElement('div');

    // Set a unique id for each result based on the item id
    resultElement.id = `item`;

    // Create an image element and set its source attribute, width, and height
    const imageElement = document.createElement('img');
    imageElement.src = result.images.smallIcon;
    imageElement.alt = result.name; // Set alt attribute for accessibility
    imageElement.style.width = "150px";
    imageElement.style.height = "150px";

    // Append the image to the result element
    resultElement.appendChild(imageElement);

    // Create a span element for the item name
    const nameElement = document.createElement('span');
    nameElement.textContent = result.name;

    // Append the name to the result element
    resultElement.appendChild(nameElement);

    // Append the result element to the anchor element
    anchorElement.appendChild(resultElement);

    // Append the anchor element to the search results container
    searchResultsContainer.appendChild(anchorElement);
});
}

onStart()