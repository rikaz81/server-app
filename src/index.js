//import express from 'express';
//import bodyParser from 'body-parser'
//import mongoose from 'mongoose'
//import jwt from 'jsonwebtoken';

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');



import { VECHICLE_ROUTES } from './routes/vechicle.route'
import { USER_ROUTES } from './routes/user.route.'
import { CONFIG } from './config';
//application initialization
let app = express();

//enables POST, PUT body data to beretreived as JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.set('port', 3000);
app.set('port', 5000);

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

//to run the server
app.listen(app.get('port'), () => {
    //EC6 syntax
    // console.log(`Node Server is running on port EC6 : ${app.get('port')}`);
    console.log('Node Server is running on port : ' + app.get('port'));
});

