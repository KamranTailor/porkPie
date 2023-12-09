const express = require("express");
const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

const router = express.Router();

router.get('/all', async (request, response) => {
    try {
        const filePath = path.join('data/tfl/station_info.json');
        const fileData = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        response.json({ data: jsonData, requestId: uuidv4() });
    } catch (error) {
        console.error('Error reading JSON file:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/select', async (request, response) => {
    try {
        const tflApiUrl = `https://api.tfl.gov.uk/StopPoint/${request.body.id}?app_id=${process.env.TFL}`;
        const res = await fetch(tflApiUrl);

        // Log the response status
        console.log('TFL API Response Status:', res.status);

        // Check if the response status is okay
        if (res.ok) {
            const data = await res.json();
            response.json({ data });
        } else {
            // Log an error if the response status is not okay
            console.error('Error fetching data from TFL API. Status:', res.status);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error fetching data from TFL API:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
