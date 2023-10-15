const express = require("express");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

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



module.exports = router;
