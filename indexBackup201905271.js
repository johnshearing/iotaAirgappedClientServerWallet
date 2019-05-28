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
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');

// The server should respond to all requests with a string.
var server = http.createServer(function(req, res){

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
});


// Start the server.
server.listen(config.port, function(){
  console.log('The server is listening on port ' + config.port + ' in ' + config.envName + ' mode.');
}); 

// All the logic for both the http and https server
var unifiedServer = fuction(req, res){
  
}

// Define the handlers.
var handlers = {};

// Sample handler
handlers.sample = function(data, callback){
  //Callback an http status code and a payload object.
  callback(406, {'name' : 'sample handler'});
};

// Not found handler
handlers.notFound = function(data, callback){
  callback(404);
};

// Define a request router.
var router = {
  'sample' : handlers.sample,
};