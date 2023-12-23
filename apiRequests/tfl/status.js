const express = require("express");
const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

const router = express.Router();

router.get('/a', async (request, response) => {
    try {
        const filePath = path.join('data/tfl/status.json');
        const fileData = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        response.json({ data: jsonData });
    } catch (error) {
        console.error('Error reading JSON file:', error);
        response.json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
