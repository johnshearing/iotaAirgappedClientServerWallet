// To start the application with the default staging configuration just start node with the following command:
// node index.js
// If using powershell and you wish to run a configuration different than the default staging config then,
// run the following command in PowerShell before starting node.
// $env:NODE_ENV="mySpecialConfigurationVariableFromTheConfigFile" 
// Now you can start node with the following as usual:
// node index.js
// For other command line interpreters such as BASH use the following command if you do not want the default staging config.
// NODE_ENV=mySpecialConfigurationVariable node index.js


// Dependencies
const server = require('./lib/server');
const workers = require('./lib/workers');

// Declare the app.
var app = {};


// Define the init function.
app.init = function()
{
  // Start the server.
  server.init();

  // Start the workers.
  //workers.init();

};


// Execute the init function
app.init();


// Export the app.
module.exports = app;

