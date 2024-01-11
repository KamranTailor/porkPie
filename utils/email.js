// utils/email.js
const fetch = require('node-fetch');

const nodemailer = require('nodemailer');
const email = "kamran_tailor@hotmail.com";
const password = process.env.OUTLOOK;

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: email,
      pass: password
    }
});

// Function to send an email and perform a basic email validation
async function sendBasicValidationEmail(toEmail, subject, content) {
  try {
    // Check if the email address is not empty
    if (!toEmail || !toEmail.trim()) {
      console.error('Invalid email address');
      return;
    }

    // Email is not empty, proceed to send the email
    const mailOptions = {
      from: 'kamran_tailor@hotmail.com', // Sender's email address
      to: toEmail, // Recipient's email address
      subject: subject,
      text: content,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);


    const messageData = {
        content: `<@&1189191922477178951>
        **Automated Email sent** 
        Subject: ${subject}
        To: ${toEmail}`,
      }
    const webhookUrl = `https://discord.com/api/webhooks/${process.env.DEMAIL}`;
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
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
}

module.exports = {
  sendBasicValidationEmail,
};
