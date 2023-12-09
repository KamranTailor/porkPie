const express = require("express");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

const router = express.Router();
exports.router = router;

router.post('/init', async (request, response) => {
    try {
        const url = `https://fortnite-api.com/v2/stats/br/v2?name=${request.body.user}&accountType=${request.body.plat}`;
        
        // Set the headers, including the Authorization header
        const headers = {
            'Authorization': process.env.FNAPI // Replace with your actual API key
        };

        const requestOptions = {
            method: 'GET',
            headers
        };

        console.log(url)
        console.log(headers)
        
        // Use 'await' to make the HTTP request and await the response
        const apiResponse = await fetch(url, requestOptions);

        if (apiResponse.ok) {
            // If the API request is successful, parse the response as JSON
            const data = await apiResponse.json();
            response.json({status: true, data: data}); // Send the data back to the client as JSON
        } else {
            // If the API request is not successful, handle the error
            response.json({status: false, error: 'API request failed' });
        }
    } catch (error) {
        // Handle any other errors that may occur
        response.json({status: false, error: 'Internal server error' });
    }
});


module.exports = router;
