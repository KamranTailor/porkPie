const express = require("express");
const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

const router = express.Router();

router.post('/line', async (request, response) => {
    try {
        const line = request.body.line
        const filePath = path.join(`data/tfl/arrivals/${line}.json`);
        const fileData = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        response.json({ data: jsonData, requestId: uuidv4() });
    } catch (error) {
        console.error('Error reading JSON file:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;