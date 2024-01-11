const express = require("express");
const crypto = require('crypto');
const fs = require('fs');
const uuid = require('uuid');
const { configDotenv } = require("dotenv");
const { sendBasicValidationEmail } = require('../utils/email');
const fetch = require('node-fetch');

const router = express.Router();

router.post('/addUser', async (request, response) => {
  // Main Items
  const first_name = request.body.userData.first_name;
  const second_name = request.body.userData.second_name;
  const dob = request.body.userData.dob;
  const email = request.body.userData.email;
  const phone_number = request.body.userData.dob;
  const propertys = {};

  // Admn permissions
  const userPermissions = request.body.userData.permissions.userPermissions;
  const editClientPins = request.body.userData.permissions.editClientPins;
  const updateDependencies = request.body.userData.permissions.updateDependencies;
  const addNewsStorys = request.body.userData.permissions.addNewsStorys;
  const editUpdates = request.body.userData.permissions.editUpdates;

  let username = `${first_name.toLowerCase()}`;
  const userData = JSON.parse(fs.readFileSync("data/userData.json", "utf8"));

  let isUsernameTaken = userData.some(user => user.username === username);
  let suffix = "a";
  while (isUsernameTaken) {
      username = `${first_name.toLowerCase()}-${suffix}`;
      isUsernameTaken = userData.some(user => user.username === username);
      suffix = String.fromCharCode(suffix.charCodeAt(0) + 1);
  }

  let maxUserId = 0;
  for (let i = 0; i < userData.length; i++) {
      if (Number(userData[i].userID) > maxUserId) {
          maxUserId = Number(userData[i].userID);
      }
  }
  let userID = (maxUserId + 1).toString();

  const serverID = uuid.v4();
  const passwordToHash = "password123";

  const salt = crypto.randomBytes(16).toString('hex');
  crypto.pbkdf2(passwordToHash, salt, 10000, 64, 'sha512', (err, derivedKey) => {
      if (err) throw err;

      const hashedPassword = derivedKey.toString('hex');

      const newUser = {
          userID,
          serverID,
          first_name,
          second_name,
          dob,
          email,
          phone_number,
          username,
          password: {
              hash: hashedPassword,
              salt: salt
          },
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

      // Remove the plain password and salt from the response
      delete newUser.password;

      emailUSR(1, newUser);
      modlog(newUser.username, "User Added by an Admin")
      return response.json({ message: true, content: newUser });
  });
});

router.post('/all', async (request, response) => {
  try {
      const userID = request.body.userID;
      const serverID = request.body.serverID;
      const users = JSON.parse(fs.readFileSync('data/userData.json', 'utf-8'));

      const user = users.find(user => String(user.userID) === userID && user.serverID === serverID);

      if (user) {
          // Remove sensitive data like 'password' before sending the response
          delete user.password;

          if (user.permississions.userPermissions == true) {

            const send = users;
            for (i in users) {
              delete send[i].serverID;
              delete send[i].password;
            }
            response.json({ success: true, content: send});
          } else {
            response.json({ success: false, message: 'Auth error' });
          }
      } else {
          response.json({ success: false, message: 'User not found' });
      }
  } catch (error) {
      console.error('Error:', error);
      response.status(500).json({ success: false, message: 'An error occurred', error: error.message });
  }
});


router.post('/delete', async (request, response) => {
  try {
    const userID = request.body.userID;
    const serverID = request.body.serverID;
    const users = JSON.parse(fs.readFileSync('data/userData.json', 'utf-8'));

    const user = users.find(user => String(user.userID) === userID && user.serverID === serverID);

    if (user) {
      if (user.permississions.userPermissions == true) {
        // Admin fully verified
        // Delete the user requested by the admin
        const userToDelete = request.body.usernameDel;
        
        // Find the index of the user to delete
        const userIndex = users.findIndex(u => u.username === userToDelete);

        if (userIndex !== -1) {
          // Remove the user from the array
          users.splice(userIndex, 1);

          // Save the updated user data to the file
          fs.writeFileSync('data/userData.json', JSON.stringify(users, null, 2), 'utf-8');

          modlog(userToDelete, "User Deleted by an Admin")
          response.json({ success: true, message: 'User deleted successfully' });
        } else {
          response.json({ success: false, message: 'User to delete not found' });
        }
      } else {
        response.json({ success: false, message: 'Auth error' });
      }
    } else {
      response.json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    response.status(500).json({ success: false, message: 'An error occurred', error: error.message });
  }
});


router.post('/resetAdm', async (request, response) => {
  try {
    const adminUserID = request.body.userID;
    const serverID = request.body.serverID;
    const users = JSON.parse(fs.readFileSync('data/userData.json', 'utf-8'));

    const adminUser = users.find(user => String(user.userID) === adminUserID && user.serverID === serverID);

    if (adminUser) {
      if (adminUser.permississions.userPermissions == true) {
        // Admin fully verified
        // Reset the password of the user requested
        const userToResetUsername = request.body.usernameDel;

        // Find the user to be reset based on the username only
        const userToReset = users.find(user => user.username === userToResetUsername);

        if (userToReset) {
          // Generate a new password (you may want to use a more secure method to generate passwords)
          const newPassword = "password123";

          // Generate a new salt
          const newSalt = crypto.randomBytes(16).toString('hex');

          // Hash the new password with the new salt
          const hashedNewPassword = crypto.pbkdf2Sync(newPassword, newSalt, 10000, 64, 'sha512').toString('hex');

          // Update the user's password and salt
          userToReset.password.hash = hashedNewPassword;
          userToReset.password.salt = newSalt;

          fs.writeFileSync('data/userData.json', JSON.stringify(users, null, 2));

          emailUSR(0, userToReset);

          modlog(userToResetUsername, "Password reset by an Admin");

          response.json({ success: true, message: 'Password reset successfully', newPassword });
        } else {
          response.json({ success: false, message: 'User to reset not found' });
        }
      } else {
        response.json({ success: false, message: 'Auth error' });
      }
    } else {
      response.json({ success: false, message: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    response.status(500).json({ success: false, message: 'An error occurred', error: error.message });
  }
});




router.post('/editUser', async (request, response) => {
  // Main Items
  const username = request.body.userData.username;
  const first_name = request.body.userData.first_name;
  const second_name = request.body.userData.second_name;
  const dob = request.body.userData.dob;
  const email = request.body.userData.email;
  const phone_number = request.body.userData.phone_number;

  // Admin permissions
  const permissions = request.body.userData.permissions;

  const userData = JSON.parse(fs.readFileSync("data/userData.json", "utf8"));

  // Find the user by username
  const userIndex = userData.findIndex(user => user.username === username);

  if (userIndex !== -1) {
      const user = userData[userIndex];

      // Update user information
      user.first_name = first_name;
      user.second_name = second_name;
      user.dob = dob;
      user.email = email;
      user.phone_number = phone_number;

      // Update user permissions
      user.permissions = permissions;

      fs.writeFileSync("data/userData.json", JSON.stringify(userData, null, 2));

      // Remove sensitive information before sending the response
      const updatedUser = { ...user };
      delete updatedUser.password;

      modlog(username, "User Edited by an Admin")
      return response.json({ message: true, content: updatedUser });
  } else {
      return response.json({ message: false, content: "User not found" });
  }
});

async function modlog(subject, message) {
  const messageData = {
    content: `<@&1188495789799002162>
    **Change for user: ${subject}** 
    ${message}`,
  }
  const webhookUrl = `https://discord.com/api/webhooks/${process.env.DLOG}`;
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    });

  } catch (error) {
    console.error('Error sending message:', error.message);
  }
}

function emailUSR(type, user) {
  const toEmail = user.email;
  let content = "";
  let subject = "";

  if (type == 0) {
    subject = 'Password Reset';
    content = `Dear ${user.first_name} ${user.second_name},

    I am writing to you today to confirm the password reset for your account for all Kamran Industries, and Tailor Tech services. 
    
    Your login credentials are as follows:
    - Username: ${user.username}
    - Password: password123
    
    To access your account and explore our services, please visit kamrantailor.com/login.
    
    Should you encounter any challenges, please do not hesitate to contact us. Simply reach out through our contact form, conveniently located at the bottom of our homepage.
    
    Kind Regards,
    
    Kamran Tailor
    CEO, Kamran Industries`
  } else if (type == 1) {
    subject = 'Account Creation';
    content = `Dear ${user.first_name} ${user.second_name},

    I am writing to you today to confirm the creation of your account for all Kamran Industries, and Tailor Tech services.
    
    Your login credentials are as follows:
    - Username: ${user.username}
    - Password: password123
    
    To access your account and explore our services, please visit kamrantailor.com/login.
    
    Should you encounter any challenges, please do not hesitate to contact us. Simply reach out through our contact form, conveniently located at the bottom of our homepage.
    
    Kind Regards,
    
    Kamran Tailor
    CEO, Kamran Industries`
  }

  sendBasicValidationEmail(toEmail, subject, content);
}
module.exports = router;