// stopPoint.js
const express = require("express");
const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

const fetchStopPoint = async () => {
    const undergroundLines = [
        "bakerloo",
        "central",
        "circle",
        "district",
        "hammersmith-city",
        "jubilee",
        "metropolitan",
        "northern",
        "piccadilly",
        "victoria",
        "waterloo-city"
    ];

    for (i in undergroundLines) {
        doJob(undergroundLines[i])
    }
};

async function doJob(line) {
    const url = `https://api.tfl.gov.uk/Line/${line}/Arrivals?app_id=${process.env.TFL}`
    const response = await fetch(url);
    const data = await response.json()
    
    // Save data to a file
    const filePath = path.join(__dirname, `../../data/tfl/arrivals/${line}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
module.exports = { fetchStopPoint };
