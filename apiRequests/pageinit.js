const express = require("express");
const fs = require('fs');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.post('/init', async (request, response) => {
    try {
        const filePath = 'data/pageViews.json';
        const rawData = fs.readFileSync(filePath);
        const jsonData = JSON.parse(rawData);

        const timestamp = Date.now();

        const newEntry = { ...request.body, ip: request.ip, id: uuidv4(), timestamp: timestamp };

        // Add the new data with the generated ID to the existing JSON data
        jsonData.push(newEntry);

        // Write the updated JSON data back to the file
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

        response.json({ success: true, message: 'Data inserted successfully' });
    } catch (error) {
        console.error('Error inserting data:', error);
        response.status(500).json({ success: false, message: 'An error occurred while inserting data' });
    }
});

module.exports = router;
