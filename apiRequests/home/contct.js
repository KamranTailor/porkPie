const express = require("express");
const fs = require('fs');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
const { sendBasicValidationEmail } = require('../../utils/email');
const { sendWebhookMessage } = require('../../utils/discord');

const router = express.Router();

router.post('/init', async (request, response) => {
    try {
        const subject = request.body.subject;
        const from = request.body.from;
        const content = request.body.content;
        const discordMSG = ``

        
        url = process.env.DCONTACT
        sendWebhookMessage(DCONTACT)
    } catch (error) {
        console.error('Error inserting data:', error);
        response.status(500).json({ success: false, message: 'An error occurred while inserting data' });
    }
});

module.exports = router;
