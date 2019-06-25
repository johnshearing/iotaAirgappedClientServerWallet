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
    'accountSid' : 'ACb32d411ad7fe886aac54c665d25e5c5d',
    'authToken' : '9455e3eb3109edc12e3d8c92768f7a67',
    'fromPhone' : '+15005550006'
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