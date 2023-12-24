async function saveUserData() {
    var userData = {
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

    const response = await fetch('/user/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userData })
    });
    const data = await response.json();
    console.log(data)
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
  setData(data);
}

async function setData(data) {
  let tbl = ` <table>
  <tr> <th>Name</th> <th>Second Name</th> <th>Username</th> </tr>`

  for (i in data.content) {
    const r = data.content[i];
    tbl += `<tr onclick="redirectToUserPage('${r.username}')">
            <td>${r.first_name}</td>
            <td>${r.second_name}</td>
            <td>${r.username}</td>
        </tr>`;
  }

  document.getElementById("users").innerHTML= tbl;
}

function redirectToUserPage(username) {
  window.location.href = `./user.html?${username}`;
}
