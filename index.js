const express = require("express");
const nodemailer = require('nodemailer');
require('dotenv').config()
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const app = express();
app.use(express.json());

//TFL Status
const fetchDataAndSave = require('./apiRequests/tfl/tflDataFetcher.js');
const intervalInMs = 60000; // 1 minute
// Run the function immediately and then at the specified interval
fetchDataAndSave();
setInterval(fetchDataAndSave, intervalInMs);

//Meta Requests
const pageinit = require('./apiRequests/pageinit.js');
app.use('/pageinit', pageinit);

//Login Requests
const login = require('./apiRequests/userVerfication.js');
app.use('/userVerfication', login);

//User Settings
const user = require('./apiRequests/user.js');
app.use('/user', user);

//Login Requests
const sc = require('./apiRequests/secureCheck.js');
app.use('/secureCheck', sc);

//TFL Routes 
const tflStopPoint = require('./apiRequests/tfl/stopPoint.js');
app.use('/tflStopPoint', tflStopPoint);

const tflStatus= require('./apiRequests/tfl/status.js');
app.use('/TFLstatus', tflStatus);

//FN Routes
const fnStats = require('./apiRequests/fortnite/stats.js');
app.use('/fn-stats', fnStats);
const fnGet = require('./apiRequests/fortnite/fn_get.js');
app.use('/fn-get', fnGet);

let port = 80;
app.use(express.static("public"));
app.listen(port, () => console.log(`Listening at port ${port}`));