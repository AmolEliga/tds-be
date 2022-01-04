/*
 *
 * Copyright (c) Tamtron Oy. All rights reserved.
 *
 */

// server.js
const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = `${process.env.PORT}`; // default port to listen

var bodyParser = require('body-parser')
const axios = require('axios');
const fs = require('fs');
const parse = require('node-html-parser').parse;

var apiRouter = express();
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//APIs
app.use("/", require("./api/routes/index.route"));


var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: true
}));

var cors = require('cors');
app.use(cors(
    {
        origin: "http://localhost:4200",
    }
));

// app.use(cors(
//     {
//         origin: "*",
//     }
// ));
// app.use((req, res, next) => {
//     res.setHeader('Acces-Control-Allow-Origin', '*');
//     res.setHeader('Acces-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
//     res.setHeader('Acces-Contorl-Allow-Methods', 'Content-Type', 'Authorization');
//     next();
// })

app.use(bodyParser.json());



//swagger
const swaggerDoc = require('./swaggerDoc');
swaggerDoc(app);

const CircularJSON = require('circular-json');

app.get("/", (req, res) => {
    res.send("TDS Running in port 5000");
});

app.listen(port, () => {
    //console.log(`TDS server started at https://ec2-18-191-255-166.us-east-2.compute.amazonaws.com:5000/:${port}`);
});