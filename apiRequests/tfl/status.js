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

router.get('/Elizabeth', async (request, response) => {
    try {
        const filePath = path.join('data/tfl/status.json');
        const fileData = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        response.json({ data: jsonData.data.elizabethDta });
    } catch (error) {
        console.error('Error reading JSON file:', error);
        response.json({ error: 'Internal Server Error' });
    }
});

router.get('/DLR', async (request, response) => {
    try {
        const filePath = path.join('data/tfl/status.json');
        const fileData = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        response.json({ data: jsonData.data.dlrDta });
    } catch (error) {
        console.error('Error reading JSON file:', error);
        response.json({ error: 'Internal Server Error' });
    }
});

router.get('/Tram', async (request, response) => {
    try {
        const filePath = path.join('data/tfl/status.json');
        const fileData = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        response.json({ data: jsonData.data.tramDta });
    } catch (error) {
        console.error('Error reading JSON file:', error);
        response.json({ error: 'Internal Server Error' });
    }
});

router.get('/Overground', async (request, response) => {
    try {
        const filePath = path.join('data/tfl/status.json');
        const fileData = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        response.json({ data: jsonData.data.overgroundDta });
    } catch (error) {
        console.error('Error reading JSON file:', error);
        response.json({ error: 'Internal Server Error' });
    }
});

router.get('/Bakerloo', async (request, response) => {
    try {
        const filePath = path.join('data/tfl/status.json');
        const fileData = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        response.json({ data: jsonData.data.tubeDta[0] });
    } catch (error) {
        console.error('Error reading JSON file:', error);
        response.json({ error: 'Internal Server Error' });
    }
});

router.get('/Central', async (request, response) => {
    try {
        const filePath = path.join('data/tfl/status.json');
        const fileData = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        response.json({ data: jsonData.data.tubeDta[1] });
    } catch (error) {
        console.error('Error reading JSON file:', error);
        response.json({ error: 'Internal Server Error' });
    }
});

router.get('/Circle', async (request, response) => {
    try {
        const filePath = path.join('data/tfl/status.json');
        const fileData = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        response.json({ data: jsonData.data.tubeDta[2] });
    } catch (error) {
        console.error('Error reading JSON file:', error);
        response.json({ error: 'Internal Server Error' });
    }
});

router.get('/District', async (request, response) => {
    try {
        const filePath = path.join('data/tfl/status.json');
        const fileData = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        response.json({ data: jsonData.data.tubeDta[3] });
    } catch (error) {
        console.error('Error reading JSON file:', error);
        response.json({ error: 'Internal Server Error' });
    }
});

router.get('/Hammersmith', async (request, response) => {
    try {
        const filePath = path.join('data/tfl/status.json');
        const fileData = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        response.json({ data: jsonData.data.tubeDta[4] });
    } catch (error) {
        console.error('Error reading JSON file:', error);
        response.json({ error: 'Internal Server Error' });
    }
});

router.get('/Jubilee', async (request, response) => {
    try {
        const filePath = path.join('data/tfl/status.json');
        const fileData = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        response.json({ data: jsonData.data.tubeDta[5] });
    } catch (error) {
        console.error('Error reading JSON file:', error);
        response.json({ error: 'Internal Server Error' });
    }
});

router.get('/Metropolitan', async (request, response) => {
    try {
        const filePath = path.join('data/tfl/status.json');
        const fileData = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        response.json({ data: jsonData.data.tubeDta[6] });
    } catch (error) {
        console.error('Error reading JSON file:', error);
        response.json({ error: 'Internal Server Error' });
    }
});

router.get('/Northern', async (request, response) => {
    try {
        const filePath = path.join('data/tfl/status.json');
        const fileData = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        response.json({ data: jsonData.data.tubeDta[7] });
    } catch (error) {
        console.error('Error reading JSON file:', error);
        response.json({ error: 'Internal Server Error' });
    }
});

router.get('/Piccadilly', async (request, response) => {
    try {
        const filePath = path.join('data/tfl/status.json');
        const fileData = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        response.json({ data: jsonData.data.tubeDta[8] });
    } catch (error) {
        console.error('Error reading JSON file:', error);
        response.json({ error: 'Internal Server Error' });
    }
});

router.get('/Victoria', async (request, response) => {
    try {
        const filePath = path.join('data/tfl/status.json');
        const fileData = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        response.json({ data: jsonData.data.tubeDta[9] });
    } catch (error) {
        console.error('Error reading JSON file:', error);
        response.json({ error: 'Internal Server Error' });
    }
});

router.get('/Warterloo', async (request, response) => {
    try {
        const filePath = path.join('data/tfl/status.json');
        const fileData = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        response.json({ data: jsonData.data.tubeDta[10] });
    } catch (error) {
        console.error('Error reading JSON file:', error);
        response.json({ error: 'Internal Server Error' });
    }
});



module.exports = router;
