const express = require("express");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const router = express.Router();

router.post('/init', async (request, response) => {
    try {
        const userID = request.body.userID;
        const serverID = request.body.serverID;
        const users = JSON.parse(fs.readFileSync('data/userData.json', 'utf-8'));

        const user = users.find(user => String(user.userID) === userID && user.serverID === serverID);

        if (user) {
            // Remove sensitive data like 'password' before sending the response
            delete user.password;
            response.json({ success: true, content: user });
        } else {
            response.json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        response.status(500).json({ success: false, message: 'An error occurred', error: error.message });
    }
});

router.post('/update', async (request, response) => {
    try {
        const userID = request.body.userID;
        const serverID = request.body.serverID;
        const updatedUserData = request.body.updatedUserData;

        const updateResult = await updateUserDataInFile(userID, serverID, updatedUserData);

        if (updateResult.success) {
            response.json({ success: true, message: 'User data updated successfully' });
        } else {
            response.json({ success: false, message: updateResult.message });
        }
    } catch (error) {
        console.error('Error:', error);
        response.status(500).json({ success: false, message: 'An error occurred', error: error.message });
    }
});

// Function to update user data in the file
async function updateUserDataInFile(userID, serverID, updatedUserData) {
    try {
        // Read existing data from the file
        const filePath = path.join(__dirname, 'data', 'userData.json');
        const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Find the user to update
        const userIndex = users.findIndex(user => String(user.userID) === userID && user.serverID === serverID);

        if (userIndex !== -1) {
            // Update the user data
            users[userIndex] = { ...users[userIndex], ...updatedUserData };

            // Save the updated data back to the file
            fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');

            return { success: true, message: 'User data updated successfully' };
        } else {
            return { success: false, message: 'User not found' };
        }
    } catch (error) {
        console.error('Error updating user data:', error);
        return { success: false, message: 'An error occurred while updating user data' };
    }
}

module.exports = router;
