const express = require("express");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

const router = express.Router();


router.get('/get_store', async (request, response) => {
    try {
        // Replace 'YOUR_API_KEY' with your actual API key
        const apiKey = process.env.FNBR;
        console.log(apiKey)
    
        // Define the URL
        const url = 'https://fnbr.co/api/shop';
    
        // Set the headers
        const headers = {
          'x-api-key': apiKey
        };
    
        // Make the GET request
        const responsee = await fetch(url, { headers });
        const data = await responsee.json();
        response.json({status: true, content: data})

      } catch (error) {
        // Handle network errors
        response.json({status: false, content: error})
      }
});

router.get('/fortniteAES', async (request, response) => {
  const apiData = await fetch("https://fortnite-api.com/v2/aes");
  const data = await apiData.json(); 
  response.json({data})
});
router.get('/fortniteBanners', async (request, response) => {
  const apiData = await fetch("https://fortnite-api.com/v1/banners");
  const data = await apiData.json(); 
  response.json({data})
});
router.get('/fortniteCosmetics', async (request, response) => {
  const apiData = await fetch("https://fortnite-api.com/v2/cosmetics/br");
  const data = await apiData.json(); 
  response.json({data})
});
router.get('/newFortniteCosmetics', async (request, response) => {
  const apiData = await fetch("https://fortnite-api.com/v2/cosmetics/br/new");
  const data = await apiData.json(); 
  response.json({data})
});
router.get('/fortniteCreatorCodes', async (request, response) => {
  const apiData = await fetch("https://fortnite-api.com/v2/creatorcode");
  const data = await apiData.json(); 
  response.json({data})
});
router.get('/fortniteNews', async (request, response) => {
  const apiData = await fetch("https://fortnite-api.com/v2/news");
  const data = await apiData.json(); 
  response.json({data})
});
router.get('/fortnitePlaylists', async (request, response) => {
  const apiData = await fetch("https://fortnite-api.com/v1/playlists");
  const data = await apiData.json(); 
  response.json({data})
});

module.exports = router;
