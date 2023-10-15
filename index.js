const express = require("express");
const nodemailer = require('nodemailer');
require('dotenv').config()
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const app = express();
app.use(express.json());

//Meta Requests
const pageinit = require('./apiRequests/pageinit.js');
app.use('/pageinit', pageinit);


//Login Requests
const login = require('./apiRequests/userVerfication.js');
app.use('/userVerfication', login);

//Login Requests
const sc = require('./apiRequests/secureCheck.js');
app.use('/secureCheck', sc);

let port = 3000;
app.use(express.static("public"));
app.listen(port, () => console.log(`Listening at port ${port}`));