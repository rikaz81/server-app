// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const dirDist = 'dist/bundle.js';

// Point static path to dist
//app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static('dist'));

//app.use(express.static(path.join(__dirname, 'src')));

//console.log(path.join(__dirname, 'dist'));
console.log('dist');

//console.log(path.join(__dirname, 'src'));

// Catch all other routes and return the index file
app.get('/*', (req, res) => {
   //const index = path.join(__dirname, 'dist', 'index.html');   
      //const index = path.join(dirDist, 'dist', 'bundle.js');   

   //const index = path.join(__dirname, 'src', 'index.html');
	
  res.sendFile(dirDist);
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '4200';
app.set('port', port);



/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});