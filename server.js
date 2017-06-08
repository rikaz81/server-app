const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

console.log('current path',path);

import { VECHICLE_ROUTES } from './routes/vechicle.route'
import { USER_ROUTES } from './routes/user.route.'

//const USER_ROUTES = require('./src/routes/user.route.');
//const VECHICLE_ROUTES = require('./src/routes/vechicle.route');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

console.log(path.join(__dirname, 'dist'));

// Catch all other routes and return the index file
app.get('/*', (req, res) => {
   const index = path.join(__dirname, 'dist', 'bundle.js');   
     	
  res.sendFile(index);
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

//enables POST, PUT body data to beretreived as JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
//connect to mongoDB instance created on mongoLabs
mongoose.connect('mongodb://root:root@ds151141.mlab.com:51141/osakamotorsdb');

app.use('/vechicle', function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware

    // let token = req.headers['x-access-token'];
    // if (!token) {
    //     res.status(401).json({ message: "Not Authorized" });
    // } else {
    //     jwt.verify(token, CONFIG.secretKey, (err, decoded) => {
    //         if (err) {
    //             res.status(401).json({ message: "Invalid Token" });
    //         } else {
    //             req.decoded = decoded;
    //             next();
    //         }
    //     });
    // }

    next();

});

app.use('/user', function (req, res, next) {
    console.log("access user route");
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();

});

app.use('/vechicle', VECHICLE_ROUTES);

app.use('/user', USER_ROUTES);

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});