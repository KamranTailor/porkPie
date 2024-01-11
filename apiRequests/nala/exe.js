const express = require("express");
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

const router = express.Router();
const logFilePath = "data/nala/exeLog.json"


router.get('/get', async (request, response) => {
  try {
    const data = await fs.readFile(logFilePath, 'utf-8');
    const logs = JSON.parse(data);
    response.json(logs);
  } catch (error) {
    response.status(500).json('Internal Server Error');
  }
});

router.post('/send', async (request, response) => {
  try {
    console.log("jel")
    const { timestamp, notes } = request.body;
    console.log(timestamp)

    const logEntry = {
      id: uuidv4(),
      timestamp,
      notes,
    };

    const data = await fs.readFile(logFilePath, 'utf-8');
    const logs = JSON.parse(data);

    logs.push(logEntry);

    await fs.writeFile(logFilePath, JSON.stringify(logs, null, 2));
    response.status(201).json(logEntry);
  } catch (error) {
    response.status(500).json('Internal Server Error');
    console.error(error)
  }
});

module.exports = router;
