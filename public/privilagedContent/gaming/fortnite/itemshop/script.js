async function onStarrt() {
    
    //Get the Data
    const response = await fetch('/fn-get/get_store');
    const data = await response.json();
    console.log(data)

    //Create varibals to make life easier 
    const items = data.content.data.featured;
    const sections = data.content.data.sections;

    let toSet = "";
    for (i in sections) {

        //Create the section 
        const newDiv = document.createElement("div");
        newDiv.id = "myDiv";  // Set an ID for the div

        //Making the section name
        const name = sections[i].displayName;
        console.log(name)
        toSet += `<h2> ${name} </h2> <div id='items-box'>`;

        //Look at all the items in the section 
        for (f in sections[i].items) {
            //Get the item
            const sectionId = sections[i].items[f];

            //Find the item in the items varibal 
            for (l in items) {
                if (sectionId == items[l].id) {
                    const r = items[l]

                    //Add HTML for the item in the section 
                    toSet += ` <div id='item'> 
                        <a href='./extra?${r.id}'>
                        <img src='${r.images.icon}'>
                        <span id='imageText'>${r.name} - V${r.price}</span> </a>
                    </div>`
                }
            }
        }
        console.log()

        //Add the section to html
        toSet += `</div>`;
        document.getElementById("toSet").innerHTML= toSet;
    }
}


async function onStart() {
    const response = await fetch('/fn-get/get_store');
    const data = await response.json();
    console.log(data)

    let uDiv = "";

    for (f in data.content.data.sections) {
        //For Evry section
        const section = data.content.data.sections[f].displayName //Saving the section display name 
        console.log(section)

        uDiv += `<h2> ${section} </h2> <div id='items-box'>`;
        for (j in data.content.data.sections[f].items) { 
            //For every item in the section
            for (k in data.content.data.featured) { 
                if (data.content.data.sections[f].items[j] == data.content.data.featured[k].id) {
                    const r = data.content.data.featured[k];
                    uDiv += ` <div id='item'> 
                        <a href='./extra?${r.id}'>
                        <img src='${r.images.icon}'>
                        <span id='imageText'>${r.name} - V${r.price}</span> </a>
                    </div>`
                }
            }
        }

        uDiv += "</div>"
    }

    document.getElementById("toSet").innerHTML= uDiv;
}

onStart()