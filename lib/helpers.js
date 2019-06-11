/*
/ Helpers for various tasks
*/

// Dependencies
var crypto = require('crypto');
var config = require('./config');
var path = require('path');
var fs = require('fs');




// Create a container for all the helpers
var helpers = {};




// Define a function to create a sha256 hash
// This is used for hashing the user's password.
// We will store the hash of the password rather than the password itself.
helpers.hash = function(str)
{
  if(typeof(str) == 'string' && str.length > 0)
  {
    var hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');

    return hash;
  } 
  else // the input was not of type string or the string was empty.
  {
      return false;
  }

}; // End of: helpers.hash = function(...
// End of: Define a function to create a sha256 hash




// Define a function to parse a JSON string to an object in all cases without throwing and error.
helpers.parseJsonToObject = function(str)
{
  try
  {
    var obj = JSON.parse(str);
    return obj;
  }
  catch(e)
  {
    return {};
  }
} // End of: Define a function to parse a JSON string to an object in all cases without throwing and error.





// Define a function to create a string of random alphanumeric characters, of a given length
helpers.createRandomString = function(strLength)
{
  // Assign the type boolean and value false to strLength if it is not a number and not greater than zero.
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;

  if(strLength) // if not false - validation was passed.
  {
    // Define all the possible characters that could go into a string
    var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    // Create an empty string
    var str = '';

    // Populate the string with random characters.
    for(i = 1; i <= strLength; i++) 
    {
      // Get a random charactert from the possibleCharacters string
      var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));

      // Append this character to the string
      str+=randomCharacter;
    }

    // Return the final string
    return str;

  } // End of: strLength validation was passed.
  else // validation for strLength was not passed
  {
    return false;
  } // End of: else validation for strLength was not passed

}; // End of: helpers.createRandomString = function(...
// End of: Define a function to create a string of random alphanumeric characters, of a given length
 



// get the string content of a template.
helpers.getTemplate = function(templateName, callback)
{
  // Validate templateName
  templateName = typeof(templateName) == 'string' && templateName.length > 0 ? templateName : false;

  if(templateName)
  {
    var templatesDir = path.join(__dirname, '/../templates/');
    fs.readFile(templatesDir + templateName + '.html', 'utf8', function(err,str)
    {
      if(!err && str && str.length >0) 
      {
        callback(false, str);
      }
      else
      {
        callback('No template could be found.');
      }
    });
  }
  else 
  {
    callback('A valid template was not specified.')
  }
}




// Export the module
module.exports = helpers;