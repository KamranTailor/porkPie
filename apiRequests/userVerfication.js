const { configDotenv } = require("dotenv");
const express = require("express");
const fs = require('fs').promises;
const crypto = require('crypto');
const fetch = require('node-fetch');

const router = express.Router();

const userDataFilePath = 'data/userData.json';

// Function to read user data from the file
async function readUsers() {
  try {
    const data = await fs.readFile(userDataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

router.post('/loginWeb', async (request, response) => {
  try {
    const inputPassword = request.body.password;
    const inputUsername = request.body.username.toLowerCase(); // Convert input to lowercase

    // Read existing users from the file
    const users = await readUsers();

    console.log("Input username:", inputUsername);

    for (const user of Object.values(users)) {
      console.log("User from data:", user.username);

      if (user.username.toLowerCase() === inputUsername) {
        // Hash the input password with the user's salt
        const hashedInputPassword = crypto.pbkdf2Sync(inputPassword, user.password.salt, 10000, 64, 'sha512').toString('hex');

        if (hashedInputPassword === user.password.hash) {
          // Passwords match
          response.json({ message: true, serverID: user.serverID, userID: user.userID });
        } else {
          // Password Incorrect
          response.json({ message: false, content: "Incorrect Password" });
        }
        return; // Exit the loop once a matching username is found
      }
    }

    // User not found
    response.json({ message: false, content: "Incorrect Username" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: false });
  }
});


router.post('/loginApp', async (request, response) => {
  try {
    const inputUsername = (request.body.username || '').toLowerCase();
    const inputPassword = request.body.password;

    const users = await readUsers();

    const user = Object.values(users).find(u => u.username.toLowerCase() === inputUsername);

    if (user) {
      const hashedInputPassword = crypto.pbkdf2Sync(inputPassword, user.password.salt, 10000, 64, 'sha512').toString('hex');

      if (hashedInputPassword === user.password.hash) {
        // Passwords match
        response.json({ success: true, userID: user.userID });
      } else {
        // Password incorrect
        response.json({ success: false, error: "Incorrect Password" });
      }
    } else {
      // User not found
      response.json({ success: false, error: "Incorrect Username" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


module.exports = router;
