let cps;

async function onStartData() {
    const serverID = localStorage.getItem('serverID');
    const userID = localStorage.getItem('userID');

    const response = await fetch('/secureCheck/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({serverID, userID})
    });
    const data1 = await response.json();
    console.log(data1)
    cps = data1.content;

    if (data1.success == false) {
      window.location= '/locked'
    }

    adminCheck();
}

function adminCheck() {
    let disperce = true;
    for (i in cps.permissions) {
        const r = cps.permissions[i];
        if (r == true) {
            disperce = false;
            break
        }
    }
    if (disperce == true) {
        alert("You do not have admin permissions");
        //window.location = "/home"
    }

    displayServices()
}

function displayServices() {
    let toDispay = "";
    if (cps.permissions.userPermissions == true) {
        toDispay += `<div class="item" id="userPermisions" onclick="navigateTo('userPermisions')">User Permisions</div>`
    } if (cps.permissions.editClientPins == true) {
        toDispay += `<div class="item" id="editClientPins" onclick="navigateTo('editClientPins')">Edit Client Pins</div>`
    } if (cps.permissions.updateDependencies == true) {
        toDispay += `<div class="item" id="updateDependencies" onclick="navigateTo('updateDependencies')">Update Dependencies</div>`
    } if (cps.permissions.addNewsStorys == true) {
        toDispay += `<div class="item" id="addNewsStorys" onclick="navigateTo('addNewsStorys')">Add News Storys</div>`
    } if (cps.permissions.editUpdates == true) {
        toDispay += `<div class="item" id="editUpdates" onclick="navigateTo('editUpdates')">Edit Updates</div>`
    }
    
    document.getElementById("dashboard").innerHTML= toDispay;
}

function navigateTo(server) {
    window.location.href = `./${server.toLowerCase()}`;
}
onStartData()