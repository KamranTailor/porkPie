async function del() {

    const serverID = localStorage.getItem('serverID');
    const userID = localStorage.getItem('userID');
    const usernameDel = modifiedQuery;
  
    const response = await fetch('/user/delete', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ serverID, userID, usernameDel})
    });
    const data = await response.json();
    console.log(data)

    if (data.success == true) {
        alert("User Deleted")
        window.location = "index.html"
    } else {
        alert("Error")
    }
}

async function res() {

    const serverID = localStorage.getItem('serverID');
    const userID = localStorage.getItem('userID');
    const usernameDel = modifiedQuery;
  
    const response = await fetch('/user/resetAdm', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ serverID, userID, usernameDel})
    });
    const data = await response.json();
    console.log(data)

    if (data.success == true) {
        alert(`Password Reset to ${data.newPassword}`)
    } else {
        alert("Error")
    }
}

async function edit() {
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

    const r = data.content
    for (i in r) {
        console.log(r[i].username, modifiedQuery)
        if (r[i].username === modifiedQuery) {
            nre(r[i])
        }
    }
}


function nre(user) {
    const toDisplay = `
    <form id="userDataFormMM">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" value="${user.first_name}" required><br>

        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" value="${user.second_name}" required><br>

        <label for="dob">Date of Birth:</label>
        <input type="date" id="dob" name="dob" value="${user.dob}" required><br>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" value="${user.email}" required><br>

        <label for="phoneNumber">Phone Number:</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" value="${user.phone_number}" required><br>

        <h3>Permissions:</h3>
        <label for="userPermissions">User Permissions:</label>
        <input type="checkbox" id="userPermissions" name="userPermissions" ${user.userPermissions ? 'checked' : ''}><br>

        <label for="editClientPins">Edit Client Pins:</label>
        <input type="checkbox" id="editClientPins" name="editClientPins" ${user.editClientPins ? 'checked' : ''}><br>

        <label for="updateDependencies">Update Dependencies:</label>
        <input type="checkbox" id="updateDependencies" name="updateDependencies" ${user.updateDependencies ? 'checked' : ''}><br>

        <label for="addNewsStorys">Add News Stories:</label>
        <input type="checkbox" id="addNewsStorys" name="addNewsStorys" ${user.addNewsStorys ? 'checked' : ''}><br>

        <label for="editUpdates">Edit Updates:</label>
        <input type="checkbox" id="editUpdates" name="editUpdates" ${user.editUpdates ? 'checked' : ''}><br>

        <button id="sbButton" type="button" onclick="send()">Save Data</button>
    </form>`;

    document.getElementById("det").innerHTML= toDisplay;
}

async function send() {
    var userData = {
        "username": modifiedQuery,
      "first_name": document.getElementById('firstName').value,
      "second_name": document.getElementById('lastName').value,
      "dob": document.getElementById('dob').value,
      "email": document.getElementById('email').value,
      "phone_number": document.getElementById('phoneNumber').value,
      "permissions": {
        "userPermissions": document.getElementById('userPermissions').checked,
        "editClientPins": document.getElementById('editClientPins').checked,
        "updateDependencies": document.getElementById('updateDependencies').checked,
        "addNewsStorys": document.getElementById('addNewsStorys').checked,
        "editUpdates": document.getElementById('editUpdates').checked
      }
    };

    console.log(userData); // You can replace this with your data saving logic

    const response = await fetch('/user/editUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userData })
    });
    const data = await response.json();
    console.log(data)
    fetchAllUsers()
  }


