/*
* Create and export configuration variables.
*
*/

// Create a container for all the environments.
var environments = {};

// Create subcontainer for the staging (default) environment.
environments.staging =
{
  'httpPort' : 3000,
  'httpsPort' : 3001,  
  'envName' : 'staging',
  'hashingSecret' : 'MyHashingSecretStaging',
  'maxChecks' : 5,
  'templateGlobals' : 
  {
    'appName' : 'IOTA Wallet',
    'companyName' : 'www.privateKeyVault.com',
    'yearCreated' : '2019',
    'baseUrl' : 'http://localhost:3000/'
  },
  'twilio' : 
  {
    'accountSid' : 'AC5940e9ea9b4507c2c14fa07d20f3bda8',
    'authToken' : '233394db45dddda1c070f81dd55ef811',
    'fromPhone' : '+18482258807'
  }
};

// Create subcontainer for the production environment.
environments.production =
{
  'httpPort' : 5000,
  'httpsPort' : 5001,  
  'envName' : 'production',
  'hashingSecret' : 'MyHashingSecretProduction',
  'maxChecks' : 5,    
  'templateGlobals' : 
  {
    'appName' : 'IOTA Wallet',
    'companyName' : 'www.privateKeyVault.com',
    'yearCreated' : '2019',
    'baseUrl' : 'http://localhost:5000/'
  },
  'twilio' : 
  {
    'accountSid' : '',
    'authToken' : '',
    'fromPhone' : ''
  }    
};

// Determine which environment was passed as a command-line argument.
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the currentEnvironment is one of the environments above.
// If not then default to staging.
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

 module.exports = environmentToExport;