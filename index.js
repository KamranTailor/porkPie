const express = require("express");
const nodemailer = require('nodemailer');
require('dotenv').config()
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const { sendBasicValidationEmail } = require('./utils/email');

const { getInternalIP, getExternalIP, sendWebhook } = require('./utils/ipUtils');
require('./download/TFL/main.js');
require('./download/crypto/main.js');

let port = 80;
const app = express();
app.use(express.json());

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

const tflStopPointLCO = require('./apiRequests/tfl/line.js');
app.use('/tflStopPointLCO', tflStopPointLCO);

const tflStatus= require('./apiRequests/tfl/status.js');
app.use('/TFLstatus', tflStatus);

const nala = require('./apiRequests/nala/exe.js');
app.use('/nala', nala);

//FN Routes
const fnStats = require('./apiRequests/fortnite/stats.js');
app.use('/fn-stats', fnStats);
const fnGet = require('./apiRequests/fortnite/fn_get.js');
app.use('/fn-get', fnGet);

// IP Adress usage
sendWebhook(port);

app.use(express.static("public"));
app.listen(port, () => console.log(`Listening at port ${port}`));