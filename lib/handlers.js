/*
/
/Request handlers
/
*/

// Dependencies
const _data = require('./data');
const helpers = require('./helpers');




// Define the container for all the handlers.
var handlers = {};


/*
*
* HTML handler functions are defined below in this section.
* There is one HTML handler for each defined route (client request) which is
* expecting an html webpage to be returned to the client browser.
*
* Below this HTML handler section you will find the JSON handlers section.
* 
* All the HTML handler functions below are called as follows:
* chosenHandler(data, function(statusCode, payload, contentType)
* The data object passed in contains the following from the client:
* trimmedPath, queryStringObject, method, headers, payload
* The HTML handler functions are expected to callback with the following:
*   http status code, the html to display in the browser, and the content type 'html'
*
*/


// Define the index handler function.
// This is executed when the user specifies the home page without a route.
handlers.index = function(data, callback)
{
  // Reject any request that isn't a get
  if(data.method == 'get')
  {
    // Prepare data for interpolation
    var templateData = 
    {
      'head.title' : 'PrivateKeyVault',
      'head.description' : 'Client/Server Air-Gapped Wallet for IOTA',
      'body.class' : 'index',

    };

    // Read in a template as a string
    helpers.getTemplate('index', templateData, function(err, str)
    {
      if(!err && str) // If there were no errors and a template was returned
      {
        // Add the universal header and footer.
        helpers.addUniversalTemplates(str, templateData, function(err, str)
        {
          if(!err && str) // if no error and template was returned:
          {
            // Return that page as html
            callback(200, str, 'html');
          } 
          else // there was an error or the template was not returned
          {
            callback(500, undefined, 'html');
          }
        });

        // Send back status code OK, html payload, and contentType to callback function
        //   that was defined and passed into the call to chosenHandler as an argument.
        // callback(200, str, 'html');
      }
      else // There was an error or no template was returned.
      {
        // Send back status code for Internal Server Error, an undefined payload, and contentType of html.
        callback(500, undefined, 'html');
      }
    }); // End of: call to helpers.getTemplate(...

  } // End of: if the method is get
  else // Method not get. Only gets allowed for an empty request (the home page)
  {
    // Send back status code for Not Allowed, an undefined payload, and contentType of html,
    callback(405, undefined, 'html');
  } // End of: else method not a get

}; // End of: handlers.index = function(...
// End of: Define the index handler.




// Define the handler function for creating user accounts.
handlers.accountCreate = function(data, callback)
{
  // Reject any request that isn't a get
  if(data.method == 'get')
  {
    // Prepare data for interpolation
    var templateData = 
    {
      'head.title' : 'Create an Account',
      'head.description' : 'Sign up is easy and only takes a few seconds',
      'body.class' : 'accountCreate',

    };

    // Read in a template as a string
    helpers.getTemplate('accountCreate', templateData, function(err, str)
    {
      if(!err && str) // If there were no errors and a template was returned
      {
        // Add the universal header and footer.
        helpers.addUniversalTemplates(str, templateData, function(err, str)
        {
          if(!err && str) // if no error and template was returned:
          {
            // Return that page as html
            callback(200, str, 'html');
          } 
          else // there was an error or the template was not returned
          {
            callback(500, undefined, 'html');
          }
        });

        // Send back status code OK, html payload, and contentType to callback function
        //   that was defined and passed into the call to chosenHandler as an argument.
        // callback(200, str, 'html');
      }
      else // There was an error or no template was returned.
      {
        // Send back status code for Internal Server Error, an undefined payload, and contentType of html.
        callback(500, undefined, 'html');
      }
    }); // End of: call to helpers.getTemplate(...

  } // End of: if the method is get
  else // Method not get. Only gets allowed for an empty request (the home page)
  {
    // Send back status code for Not Allowed, an undefined payload, and contentType of html,
    callback(405, undefined, 'html');
  } // End of: else method not a get  
}; // End of: handlers.accountCreate = function(...
// End of: Define the handler function for creating user accounts.




// Define the favicon handler function.
handlers.favicon = function(data, callback)
{
  // This handler only allows the get method
  if(data.method == 'get')
  {
    // Call function to read in the favicon's data
    helpers.getStaticAsset('favicon.ico', function(err, data)
    {
      if(!err && data) // if the favicon was returned without error
      {
        callback(200, data, 'favicon');
      }
      else // there was an error or the favicon was not returned.
      { 
        callback(500); // http status code 500 is: internal server error
      }
    }); // End of: call to helpers.getStaticAsset('favicon.ico'...

  } // End of: if(data.method == 'get')
  else // a method other than get was specifed by the client so report back method not allowed.
  {
    callback(405); //http status code 405 is: Method not allowed
  }
} // End of: handlers.favicon = function(...
// Define the favicon handler function.




// Define the public assets handler function.
// This function returns public asset files in the public folder to the client browser.
// Such asset files might be of types: plain text, css, png, jpg, and ico
handlers.public = function(data, callback)
{
  // This handler only allows the get method
  if(data.method == 'get')
  {
    //Get the file name being requested
    var trimmedAssetName = data.trimmedPath.replace('public', '').trim();

    // if there were characters after the word public in the client's request
    if(trimmedAssetName.length > 0)
    {
      // Read in the asset's data
      helpers.getStaticAsset(trimmedAssetName, function(err, data)
      {
        if(!err && data) // if the public asset was returned without error
        {
          // Determine the content type and default to plain text if undetermined.
          var contentType = 'plain';

          if(trimmedAssetName.indexOf('.css') > -1)
          {
            contentType = 'css';
          }

          if(trimmedAssetName.indexOf('.png') > -1)
          {
            contentType = 'png';
          }   
          
          if(trimmedAssetName.indexOf('.jpg') > -1)
          {
            contentType = 'jpg';
          }
          
          if(trimmedAssetName.indexOf('.ico') > -1)
          {
            contentType = 'favicon';
          }
          
          // Return the status code OK, the contents of the file, and the contentType determined above.
          callback(200, data, contentType);

        } //End of: if the public asset was returned without error
        else // there was an error or the public asset was not returned.
        { 
          callback(404); // http status code 404 is: Not found
        }        
      }); // End of: call to helpers.getStaticAsset(...

    } // End of: if there were characters after the word public in the client's request
    else // there were no characters after the word "public" in the client's request
    {
      callback(404) // http status code 404 is not found
    } // End of: else there were no characters after the word "public" in the client's request

  } // End of: If the method is 'get'
  else // A method other than get was specifed by the client so report back method not allowed.
  {
    callback(405); //http status code 405 is: Method not allowed
  }
} // End of: handlers.public = function(...
// Define the public assets handler function.    


/*
*
* End of: HTML handlers
*
*/




/*
*
* JSON API handlers
*
*/


// Define a function which calls the requested get, post, put, or delete subhandler function for Users 
// and passes to the chosen subhandler the client's request object and the callback function.
handlers.users = function(data, callback)
{
  // Create an array of acceptable methods.
  var acceptableMethods = ['post', 'get', 'put', 'delete'];

  // if the requested method is one of the acceptable methods:
  if (acceptableMethods.indexOf(data.method) > -1) 
  {
    // then call the appropriate Users subhandler.
    handlers._users[data.method](data, callback);
  } 
  // Otherwise the method was not one of the acceptable methods:
  else 
  {
    // so send back status 405 (Not Allowed).
    callback(405);
  }
};




// Create a subobject within the handlers object for the user's submethods (post, get, put, and delete)
handlers._users = {};




// Users - post subhandler
// Define the user's post subhandler function.
// This function creates a new user file in the users directory.
// Required data: firstName, lastName, phone, email, password, tosAgreement.
// Optional data: none
handlers._users.post = function(data, callback)
{
  // Create variables for the post from the clients request object.
  // The variables will be loaded from the object if validation is passed otherwise will be assigned the value false.
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;  
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;


  //if every field passed the validation process above then do the following.
  if(firstName && lastName && phone && email && password && tosAgreement)
  {  
    // We are expecting this read to fail. That's how we know we are not adding a duplicate record.
    _data.read('users',  phone, function(err, data){
        if(err) //The read failed. This is not a duplicate. So go ahead and add the record.
        {
          // Hash the password
          var hashedPassword = helpers.hash(password);

          if(hashedPassword) // The hash function successfully returned the hashed password.
          {
            // Create the user object. This object will be used to create the single record in each user file.
            // This is not a database. A new file is created for each user which contains only one record.
            var userObject = 
            {
                'firstName' : firstName,
                'lastName' : lastName,
                'phone' : phone,
                'email' : email,
                'hashedPassword' : hashedPassword,
                'tosAgreement' : true
            };

            // Calling the function which creates a user file.
            _data.create(
            'users', 
            phone, 
            userObject, 
            function(err)
            {
              if (!err)  //The file has been created successfully.
              {
                callback(200);
              } 
              else // There was an error creating the file.
              {
                console.log(err);
                callback(500, {'Error' : 'Could not create the new user.'});
              }
            }); // End of: Calling the function which creates a user file.      

          } // End of: The hash function successfully returned the hashed password.
          else // The password was not hashed successfully.
          {
            callback(500, {'Error' : 'Could not hash the user\'s password'});
          } // End of: else the password was not hashed successfully.

        } 
        else // The user already exists
        {
          callback(400, {'Error' : 'A user with that phone number already exists'});
        } // End of: else the user already exists
    }); // End of: Attempt a read to ensure the user does not already exist.
  } // End of: If field validation has been passed successfully.
  else // Field validation failed.
  {
      callback(400, {'Error' : 'Missing required fields'});
  } // End of: else field validation failed.
}; // End of: handlers._users.post = function(...






// Users - get subhandler
// Define the user's get subhandler function.
// This function gets the single record from a user file in the users directory. 
// It selects the correct file by using the phone number provided as lookup against the file name.
// Required data: phone
// Optional data: none
// @TODO: Only let an authenticated user access their own object.
// @TODO: And don't let them access anyone else's object.
handlers._users.get = function(data, callback)
{
  // Check that the phone number is valid.
  // Checking that the phone number is of type string and that the length is 10 characters.
  // Create the phone variable for the get from the clients query string.
  // The variable will be loaded from the query string if validation is passed otherwise will be assigned the value false.
  var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  
  // if the validation was passed:
  if(phone)
  {
    // Look for the user's file and retrive the record. 
    // Calling the -data.read function. 
    // Passing in the directory to look in, 
    // the phone number to look up the correct file,
    // and a callback function to perform after an attempt was made to retrive the record in the file.
    _data.read('users', phone, function(err, data)
    { 
      // if there was no error and the user's record was returned
      if(!err && data)
      {
        // Remove the hashed password from the user before returning it to the requester.
        delete data.hashedPassword; 

        // Run the callback function that was passed into this handler.
        // To avoid confusion:
        // The "data" var passed to the callback is not the query string passed into the user's get handler at the top.
        // It is rather the "data" found inside the users file which was returned by the _data.read function.
        // WTF - right? That's because the callback below is inside this callback that we are defining for _data.read.
        // So if _data.read is running this function then _data.read gets to pass it's own data to the data argument above
        // when data.read is called, and that would be the text it finds in the user's file converted to a JSON object.
        // Perhaps it would have been better to give these two "data" variables different names.
        callback(200, data); 
      } // End of: if(!err && data)

      else // There was an error or no record was returned.
      {
        callback(404); // 404 is http status code: Not Found
      }  // End of: There was an error or no record was returned.

    }); // End of call to _data.read
  } 
  else // The phone number did not pass validation.
  {
    callback(400, {'Error' : 'Missing required field'});
  } // End of: else the phone number did not pass validation.

}; // End of: handlers._users.get = function(...
// End of: Define the user's get subhandler function.




// Users - put handler
// Define the user's put subhandler function
// This function changes the record in the user's file. 
// Required data: phone
// Optional data: firstName, lastName, email, password, tosAgreement
// Note: At least one of the optional arguments must be specified.
// @TODO: Only let an authenticated user update their own object. 
// Do not let them update anyone else's
handlers._users.put = function(data, callback){

  // Check the required phone field. 
  // Must be of type string and have a length of 10 characters. 
  // If not then set to boolean false.
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;

  // Check for the optional fields.
  // Create variables for the post from the clients request object.
  // The variables will be loaded from the object if validation is passed otherwise will be assigned the value false.
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;  
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  

  if(phone) // If the phone number passed validation test.
  {
    // If the user supplied items to update and these passed validation
    if(firstName || lastName || password)
    {
      // Look up the user file and return the record as a JSON object.
      _data.read('users', phone, function(err, userData)
      {
        // If there was no error accessing the user file and data was returned:
        if(!err && userData)
        {
          // Update the fields if necessary
          if(firstName){
            userData.firstName = firstName;
          }
          if(lastName){
            userData.lastName = lastName;
          }
          if(email){
            userData.email = email;
          }
          if(password){
            userData.hashedPassword = helpers.hash(password);
          }
          // Store the new updates
          _data.update('users',phone,userData,function(err){

            if(!err) // If there was no error updating the user file:
            {
              callback(200); // Send back OK status code
            } 
            else // There was an error updating the user file:
            {
              console.log(err);
              callback(500,{'Error' : 'Could not update the user.'}); // 500 means something went wrong on the server.
            }
          }); // End of: Store the new updates

        } // End of: If there was no error accessing the user file and data was returned:
        else // There was an error accessing the user file or data was not returned:
        {
          callback(400,{'Error' : 'Specified user does not exist.'}); // Code 400 is bad request
        } //End of: There was an error accessing the user file or data was not returned:

      }); // End of: _data.read(...

    } // End of: If the user supplied items to update and these passed validation
    else // The user did not supply items to update or they did not pass validation
    {
      callback(400,{'Error' : 'Missing fields to update.'}); // 400 is Bad Request
    } // End of: The user did not supply items to update or they did not pass validation

  } // End of: If the phone is valid.
  else // The phone number did not pass validation test.
  {
    callback(400,{'Error' : 'Missing required field.'}); // 400 is Bad Request
  } // End of: The phone number did not pass validation test.

}; // End of: handlers._users.put = function(...
// End of: Define the user's put subhandler function




// Users - delete
// Define the user's delete subhandler function.
// This function deletes the user's file.
// Required field: phone
// @TODO: Only let an authenticated user delete their own file. Don't let them delete anyone else's.
// @TODO: Clean up (delete) any other data files associated with this user.
handlers._users.delete = function(data, callback){

  // Check that the phone number is valid.
  // Must be of type string and have length of 10 characters.
  // Create the phone variable for the delete from the clients query string.
  // The variable will be loaded from the query string if validation is passed otherwise will be assigned the value false.
  var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  
  // if the phone number validation was passed:
  if(phone)
  {
    // Look for the user's file and retrive the record. 
    // Calling the -data.read function. 
    // Just checking to see that the file exists to delete.
    // Passing in the directory to look in, 
    // the phone number to look up the correct file,
    // and a callback function to perform after an attempt was made to retrive the record in the file.
    _data.read('users', phone, function(err, data)
    { 
      // if there was no error and the user's record was returned we know that the file exists.
      if(!err && data)
      {
        // Now delete the users record
        _data.delete('users', phone, function(err)
        {
          if(!err) // If the users file was deleted successfully:
          {
            // Send back http status code 200: Everything OK.
            callback(200);
          } 
          else // There was an error. The users file was not deleted.
          {
            // Send back http status Code 500: Internal Server Error
            callback(500, {'Error' : 'Could not delete the specified user.'}); 
          }
        }); // End of: Now delete the users record

      } // End of: if there was no error and the user's record was returned we know that the file exists.
      else // There was an error or no record was returned. Likely not found.
      {
        // Send back http status code 404: Not Found
        callback(404); 
      }  // End of: There was an error or no record was returned. Likely not found.

    }); // End of call to _data.read(...
  } 
  else // The phone number did not pass validation.
  {
    callback(400, {'Error' : 'Missing required field'}); // 400 is http status code: Bad Request
  } // End of: else the phone number did not pass validation.

}; // End of: handlers._users.delete = function(...
// End of: Define the user's delete subhandler function.




// Define a function which calls the requested get, post, put, or delete subhandler function for tokens 
// and passes to the chosen subhandler the client's request object and the callback function.
handlers.tokens = function(data, callback)
{
  // Create an array of acceptable methods.
  var acceptableMethods = ['post', 'get', 'put', 'delete'];

  // if the requested method is one of the acceptable methods:
  if (acceptableMethods.indexOf(data.method) > -1) 
  {
    // then call the appropriate tokens subhandler.
    handlers._tokens[data.method](data, callback);
  } 
  // Otherwise the method was not one of the acceptable methods:
  else 
  {
    // so send back status 405 (Not Allowed).
    callback(405);
  }
}; // End of: handlers.tokens = function(...
//End of: Define a function which calls the requested get, post, put, or delete subhandler function for tokens 




// Create a subobject within the handlers object for the tokens submethods (post, get, put, and delete)
handlers._tokens = {};




// tokens - post subhandler
// Define the tokens post subhandler function.
// This function creates a new token file in the tokens directory.
// Required data: phone, password.
// Optional data: none
handlers._tokens.post = function(data, callback)
{
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  // if phone and password are of the correct datatypes and the values are not empty
  if(phone && password) 
  {
    //Lookup the user who matches that phone number.
    _data.read('users', phone, function(err, userData)
    {    
      if(!err && userData) //if the user was found
      {
        // Hash the sent password and compare it to the hashed password returned from user data.
        var hashedPassword = helpers.hash(password);

        // if hashed password supplied matches hashed password stored:
        if(hashedPassword == userData.hashedPassword)
        {
          // Create a new token with a random name and set to expire 1 hour in the future.
          var tokenId = helpers.createRandomString(20); 
          var expires = Date.now() + 1000 * 60 * 60;

          // This is the token.
          var tokenObject = 
          {
            'phone' : phone,
            'id': tokenId,
            'expires' : expires
          };

          // Store the token
          _data.create('tokens', tokenId, tokenObject, function(err)
          {
            if(!err) // The token was successfully stored in a new file.
            {
              callback(200, tokenObject);
            }
            else // The token was not successfully stored in a new file.
            {
              callback(500, {'Error' : 'Could not create the new token'});
            }
          }); // End of: call to _data.create(...
          // End of: Store the token

        }
        else // the password supplied is not correct.
        {
          callback(400, {'Error' : 'The password supplied did not match the specifed user\'s stored password'});
        }var expires = Date.now() + 1000 * 60 * 60;


      }
      else // the user was not found
      {
        callback(400, {'Error' : 'Could not find the specifed user'});
      };

    }); // End of call to _data.read(...
    // End of: Lookup the user who matches that phone number.

  } // End of: if phone and password are of the correct datatypes and the values are not empty:
  else // Phone and or password is not of the correct data type or one of the values is empty:
  {
    callback(400, {'Error' : 'Missing required field(s)'});
  }

}; //End of: handlers._tokens.post = function(...
// End of: Define the tokens post subhandler function.





// tokens - get subhandler
// Define the token get subhandler function.
// This function gets the single record from a token file in the token directory.
// It selects the correct file by using the id provided as lookup against the file name.
// Required data: id
// Optional data: none
handlers._tokens.get = function(data, callback)
{
  // Check that the id is valid.
  // Checking that the type is string and that the length is equal to 20 characters.
  // Create the id variable for the get from the clients query string.
  // The variable will be loaded from the query string if validation is passed otherwise will be assigned the value false.
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  
  // if the validation was passed:
  if(id)
  {
    // Look for the token file and retrive the record inside. 
    // Calling the -data.read function. 
    // Passing in the directory to look in, 
    // the id to look up the correct file,
    // and a callback function to perform after an attempt was made to retrive the record in the file.
    _data.read('tokens', id, function(err, tokenData)
    { 
      // if there was no error and the token record was returned
      if(!err && tokenData)
      {
        // Run the callback function that was passed into this handler.
        callback(200, tokenData);
      } // End of: if(!err && data)

      else // There was an error or no record was returned.
      {
        callback(404); // 404 is http status code: Not Found
      }  // End of: There was an error or no record was returned.

    }); // End of call to _data.read
  } 
  else // The id did not pass validation.
  {
    callback(400, {'Error' : 'Missing required field'});
  } // End of: else the id did not pass validation.
}; // End of: handlers._tokens.get = function(...
// Define the token get subhandler function.



// tokens - put subhandler
// Define the tokens put subhandler function
// This function changes the record in a tokens file. 
// The old record is erased and a new record is added.
// The only thing the user will be allowed to do with the record is extend the expiration time.
// Required data: id of type string, and extend of type boolean.
// Optional data: none
// @TODO: Only let an authenticated user update their own object. 
// @ Do not let them update anyone else's
handlers._tokens.put = function(data, callback)
{
  // Validate the data passed in to this function.
  // Check if id is of type string and that it has a length of 20 characters. If not then set to boolean false.
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;

  // Check if extend is of type boolean and that it is set to true. If not then set to boolean type and value false.
  var extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;

  if(id && extend) // If the data passsed validation
  {
    // Lookup the token
    _data.read('tokens', id , function(err, tokenData)
    {
      if(!err && tokenData) // if the token was found and the record was read successfully
      {
        // Check to make sure the token isn't already expired
        if(tokenData.expires > Date.now()) // if the token has not expired
        {
          // Set the expiration an hour from now
          tokenData.expires = Date.now() + 1000 * 60 * 60;

          // Store the new updates to the token file
          _data.update('tokens', id, tokenData, function(err)
          {
            if(!err) // If the new expire time was written to the token file
            {
              callback(200);
            }
            else // the expire time was not successfully written to the token file
            {
              callback(500, {'Error' : 'Could not update the token\'s expiration'});
            }
          }); // End of: _data.update(...
          // End of: Store the new updates to the token file

        } // End of: if the token has not expired
        else // the token has already expired
        {
          callback(400, {'Error' : 'The token has already expired and can not be extended'});
        }

      } // End of: if the token was found and the record was read successfully
      else // the token was not found
      {
        callback(400, {'Error' : 'Specified token does not exist'});
      }
    }); // End of: call to _data.read(...
    // End of: Lookup the token

  } // End of: if the data passed validation
  else // The data did not pass validation
  {
    callback(400, {'Error' : 'Missing required field(s) or fields are invalid'});
  }
}; // End of: handlers._tokens.put = function(...
// End of: Define the tokens put subhandler function




// Tokens - delete
// Define the tokens delete subhandler function.
// This function deletes a user's token file.
// This is how logging out is accomplished.
// Required field: id
// @TODO: Only let an authenticated user delete their own file. Don't let them delete anyone else's.
// @TODO: Clean up (delete) any other data files associated with this user.
handlers._tokens.delete = function(data, callback){

  // Check that the id is valid.
  // Must be of type string and have length of 20 characters.
  // Create the id variable for the delete from the clients query string.
  // The id variable will be loaded from the query string if validation is passed. 
  // Otherwise id will be assigned the type boolean and the value false.
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  
  // if the id validation was passed:
  if(id)
  {
    // Look for the token file and retrive the record. 
    // Calling the -data.read function. 
    // Just checking to see that the file exists to delete.
    // Passing in the directory to look in, 
    // the id to look up the correct file,
    // and a callback function to perform after an attempt was made to retrive the record in the file.
    _data.read('tokens', id, function(err, data)
    { 
      // if there was no error and the token record was returned we know that the file exists.
      if(!err && data)
      {
        // Now delete the token record
        _data.delete('tokens', id, function(err)
        {
          if(!err) // If the token file was deleted successfully:
          {
            // Send back http status code 200: Everything OK.
            callback(200);
          } 
          else // There was an error. The token file was not deleted.
          {
            // Send back http status Code 500: Internal Server Error
            callback(500, {'Error' : 'Could not delete the specified token file.'}); 
          }
        }); // End of: Now delete the token record

      } // End of: if there was no error and the token record was returned we know that the file exists.
      else // There was an error or no record was returned. Likely not found.
      {
        // Send back http status code 404: Not Found
        callback(404); 
      }  // End of: There was an error or no record was returned. Likely not found.

    }); // End of call to _data.read(...
  } 
  else // The id number did not pass validation.
  {
    callback(400, {'Error' : 'Missing required field'}); // 400 is http status code: Bad Request
  } // End of: else the id did not pass validation.

}; // End of: handlers._tokens.delete = function(...
// End of: Define the tokens delete subhandler function. 




// Sample handler
handlers.sample = function(data, callback){
  //Callback an http status code and a payload object.
  callback(406, {'name' : 'sample handler'});
};




/*
*
* End of: JSON API handlers
*
*/




// Ping handler
handlers.ping = function(data, callback){
  //Callback an http status code of 200.
  callback(200);
};





// Not found handler
handlers.notFound = function(data, callback){
  callback(404);
}; 




// Export the module.
module.exports = handlers;