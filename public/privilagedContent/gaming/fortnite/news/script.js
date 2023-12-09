async function onStart() {
    const response = await fetch('/fn-get/fortniteNews')
    const data = await response.json()
    console.log(data)
    

    let toSet = "";
    for (i in data.data.data.br.motds) {
        const r = data.data.data.br.motds[i];

        toSet += `
        <div class="dashboard-item" onclick="display('${r.body}')">
            <img src="${r.image}" alt="Example Image">
            <div class="item-details">
                <span id='title'>${r.title}</span>
            </div>
        </div>`
    }

    document.getElementById("dashboard").innerHTML= toSet;
}

function display(td) {
    alert(td)
}
onStart()