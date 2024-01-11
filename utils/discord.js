const https = require('https');
const fetch = require('node-fetch');

async function sendWebhookMessage(webhookURL, content) {
  const data = JSON.stringify({ content });

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(webhookUR, options, (res) => {
      const webhookURL = `https://discord.com/api/webhooks/${webhookUR}`
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('Webhook message sent successfully');
          resolve();
        } else {
          console.error(`Error sending webhook message. Status code: ${res.statusCode}, Response: ${responseData}`);
          reject(new Error(`Error sending webhook message. Status code: ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('Error sending webhook message:', error.message);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

module.exports = {
    sendWebhookMessage,
  };
