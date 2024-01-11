// TFL/main.js
const { fetchStopPoint } = require('./stopPoint.js');
const fetchDataAndSave = require('./tflDataFetcher.js');
const { sendWebhookMessage } = require('../../utils/discord.js');
webUrl = process.env.DTFLDATA;

const stopPointInterval = 30000; // 30 seconds in milliseconds
const dataFetcherInterval = 60000; // 1 minute

// Run the fetchStopPoint function every 30 seconds
fetchStopPoint()
setInterval(() => {
    fetchStopPoint();
}, stopPointInterval);

// Run the fetchDataAndSave function immediately and then at the specified interval
fetchDataAndSave();
setInterval(fetchDataAndSave, dataFetcherInterval);
