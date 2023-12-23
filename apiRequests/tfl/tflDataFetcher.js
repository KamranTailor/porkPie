const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');

const TFL_API_BASE_URL = 'https://api.tfl.gov.uk/line/mode/';
const DATA_FILE_PATH = 'data/tfl/status.json';
const webhookUrl = `https://discord.com/api/webhooks/${process.env.DSTAUS}`;

const fetchTFLData = async (mode, tflKey) => {
  const url = `${TFL_API_BASE_URL}${mode}/status?app_id=${tflKey}`;
  const response = await fetch(url);
  return response.json();
};

const compareStatusSeverity = async (newData, oldData) => {
  for (const newLine of newData) {
    const oldLine = oldData.find(line => line.id === newLine.id);

    if (!oldLine) {
      console.log(`Line ${newLine.id} not found in old data.`);
      continue;
    }

    const newStatus = newLine.lineStatuses[0].statusSeverityDescription;
    const oldStatus = oldLine.lineStatuses[0].statusSeverityDescription;

    if (newStatus !== oldStatus) {
      const messageData = {
        content: `<@&1188090307934425188> Status change for line ${newLine.name}: ${oldStatus} -> ${newStatus}`,
      };
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageData),
        });
   
      } catch (error) {
        console.error('Error sending message:', error.message);
      }
    }
    
  }
};


const fetchDataAndSave = async (tflKey) => {
  try {
    const tubeData = await fetchTFLData('tube', tflKey);
    const elizabethDta = await fetchTFLData('elizabeth-line', tflKey);
    const dlrDta = await fetchTFLData('dlr', tflKey);
    const tramDta = await fetchTFLData('tram', tflKey);
    const overgroundDta = await fetchTFLData('overground', tflKey);

    const oldData = JSON.parse(await fs.readFile(DATA_FILE_PATH, 'utf8'));

    compareStatusSeverity(tubeData, oldData.tubeDta);
    compareStatusSeverity(elizabethDta, oldData.elizabethDta);
    compareStatusSeverity(dlrDta, oldData.dlrDta);
    compareStatusSeverity(tramDta, oldData.tramDta);
    compareStatusSeverity(overgroundDta, oldData.overgroundDta);

    const result = {
      tubeDta: tubeData,
      elizabethDta: elizabethDta,
      dlrDta: dlrDta,
      tramDta: tramDta,
      overgroundDta: overgroundDta
    };

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error fetching or saving data:', error);
  }
};


module.exports = fetchDataAndSave;
