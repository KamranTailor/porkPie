async function saveUserData() {
    var userData = {
      "first_name": document.getElementById('firstName').value,
      "last_name": document.getElementById('lastName').value,
      "dob": document.getElementById('dob').value,
      "email": document.getElementById('email').value,
      "phone_number": document.getElementById('phoneNumber').value,
      "password": document.getElementById('password').value,
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