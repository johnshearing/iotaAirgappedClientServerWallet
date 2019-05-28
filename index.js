/*
*
* Primary file for the API
*
*/

// To start node with the default staging configuration just start node with the following command:
// node index.js
// If using powershell and you wish to run a configuration different than the default staging config then,
// run the following command in PowerShell before starting node.
// $env:NODE_ENV="mySpecialConfigurationVariable" 
// Now you can start node with the following as usual:
// node index.js
// For other command line interpreters use the following command if you do not want the default staging config.
// NODE_ENV=mySpecialConfigurationVariable node index.js

const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs');

// Instantiate the http server.
var httpServer = http.createServer(function(req, res){
  unifiedServer(req, res);
});

// Start the http server.
httpServer.listen(config.httpPort, function(){
  console.log('The server is listening on port ' + config.httpPort + ' in ' + config.envName + ' mode.');
}); 


// Instantiate the https server.
var httpsServerOptions = {
  'key' : fs.readFileSync('./https/key.pem'),
  'cert' : fs.readFileSync('./https/cert.pem')
};

var httpsServer = https.createServer(httpsServerOptions, function(req, res){
  unifiedServer(req, res);
});


// Start the https server.
// Note: https is not working on ports 3001 and 5001 - 
// probably because the certificates were not created on this computer but were rather copied from another.
// To fix this:
// I will need to install the openssl library and run the following command at the console from the https directory:
// openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
httpsServer.listen(config.httpsPort, function(){
  console.log('The server is listening on port ' + config.httpsPort + ' in ' + config.envName + ' mode.');
}); 


// All the logic for both the http and https server
var unifiedServer = function(req, res){
  // Get the URL and parse it.
  var parsedUrl = url.parse(req.url, true);

  // Get the path from the URL.
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the query string as an object.
  var queryStringObject = parsedUrl.query;

  // Get the http method.
  var method = req.method.toLowerCase(); 

  // Get the headers as an Object
  var headers = req.headers;

  //Get the payload if there is any.
  var decoder = new StringDecoder('utf-8');

  var buffer = '';
  req.on('data', function(data){
    buffer += decoder.write(data);
  });

  req.on('end', function(){
    buffer += decoder.end();

    // Chose the handler this request should go to.
    // If one is not found, use the notFound handler.
    var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Construct the data object to send to the handler.
    var data = {
        'trimmedPath' : trimmedPath,
        'queryStringObject' : queryStringObject,
        'method' : method,
        'headers' : headers,
        'payload' : buffer 
    };

    // Route the request to the handler specified in the router.
    chosenHandler(data, function(statusCode, payload){

      // Use the status code called back by the handler, or default to 200.
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

      // Use the payload called back by the handler, or default to an empty object.
      payload = typeof(payload) =='object' ? payload : {};

      // Convert the payload to a string.
      var payloadString =  JSON.stringify(payload);

      // Return the response.
      res.setHeader('Content-Type', 'application/json' );
      res.writeHead(statusCode);
      res.end(payloadString);

      console.log('Returning this response: ', statusCode, payloadString);      
    });
  });  
};

// Define the handlers.
var handlers = {};

// Sample handler
handlers.sample = function(data, callback){
  //Callback an http status code and a payload object.
  callback(406, {'name' : 'sample handler'});
};

// Ping handler
handlers.ping = function(data, callback){
  //Callback an http status code of 200.
  callback(200);
};

// Not found handler
handlers.notFound = function(data, callback){
  callback(404);
};

// Define a request router.
var router = {
  'sample' : handlers.sample,
  'ping' : handlers.ping,
};