const express = require("express");
const fs = require('fs');
const uuid = require('uuid');

const router = express.Router();

router.post('/addUser', async (request, response) => {
    //Main Items
    const first_name = request.body.userData.first_name; // First Name
    const second_name = request.body.userData.second_name; // Second Name
    const dob = request.body.userData.dob; // DOB
    const email = request.body.userData.email; 
    const phone_number= request.body.userData.dob; // Date of birth
    const password = request.body.userData.password;
    const propertys = {};

    //Admn permissions
    const userPermissions = request.body.userData.permissions.userPermissions;
    const editClientPins = request.body.userData.permissions.editClientPins;
    const updateDependencies = request.body.userData.permissions.updateDependencies;
    const addNewsStorys = request.body.userData.permissions.addNewsStorys;
    const editUpdates = request.body.userData.permissions.editUpdates;
  
    let username = `${first_name.toLowerCase()}${dob.split("-")[0]}`; // lastName,yearborn
    // Check if username is already in use in data/userData.json
    const userData = JSON.parse(fs.readFileSync("data/userData.json", "utf8"));
  
    let isUsernameTaken = userData.some(user => user.username === username);
    let suffix = "a";
    while (isUsernameTaken) {
      username = `${first_name.toLowerCase()}${dob.split("-")[0]}${suffix}`;
      isUsernameTaken = userData.some(user => user.username === username);
      suffix = String.fromCharCode(suffix.charCodeAt(0) + 1);
    }
  
    //User ID
    var maxUserId = 0; // Initialize maxUserId as a number
    for (var i = 0; i < userData.length; i++) {
      if (Number(userData[i].userID) > maxUserId) { // Use "userID" here
        maxUserId = Number(userData[i].userID); // Use "userID" here
      }
    }
    var userID = (maxUserId + 1); // Increment as a number, then convert to string
  
    //User SSC 
    const serverID = uuid.v4();
    //const password = hashPassword(passwordll);
  
    const newUser = {
      userID,
      serverID,
      first_name,
      second_name,
      dob,
      email,
      phone_number,
      username,
      password,
      propertys,
      permississions: {
        userPermissions, 
        editClientPins,
        updateDependencies,
        addNewsStorys,
        editUpdates
      }
    };
  
    userData.push(newUser);
    fs.writeFileSync("data/userData.json", JSON.stringify(userData, null, 2));
  
    delete newUser.serverID;
    delete newUser.password;
    return response.json({ message: true, content: newUser });
});

module.exports = router;