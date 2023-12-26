// ipUtils.js

const os = require('os');
const request = require('request');

// Function to get the internal IP address
function getInternalIP() {
  const ifaces = os.networkInterfaces();
  let internalIP = '';

  Object.keys(ifaces).forEach((ifname) => {
    ifaces[ifname].forEach((iface) => {
      if (iface.family === 'IPv4' && !iface.internal) {
        internalIP = iface.address;
      }
    });
  });

  return internalIP;
}

// Function to get the external IP address using an external service
function getExternalIP(callback) {
  request('https://api64.ipify.org?format=json', (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const externalIP = JSON.parse(body).ip;
      callback(null, externalIP);
    } else {
      callback(error || new Error('Unable to fetch external IP'));
    }
  });
}

// Function to send a Discord webhook message
async function sendWebhook(port) {
    const internalIP = getInternalIP();
  
    getExternalIP(async (error, externalIP) => {
      if (error) {
        console.error('Error fetching external IP:', error.message);
      } else {
  
        const messageData = {
          content: `<@&1188819185397145691>
          **Server Reboot** 
          Local IP: ${internalIP}
          External IP: ${externalIP}
          Port: ${port}`,
        };
  
        const webhookUrl = `https://discord.com/api/webhooks/${process.env.DIP}`;
        try {
          const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData),
          });
  
          if (!response.ok) {
            console.error('Error sending message:', response.statusText);
          }
        } catch (error) {
          console.error('Error sending message:', error.message);
        }
      }
    });
  }
  
  module.exports = {
    getInternalIP,
    getExternalIP,
    sendWebhook,
  };
