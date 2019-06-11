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
* HTML handlers
*
*/


// Index handler
handlers.index = function(data, callback)
{
  // Reject any request that isn't a get
  if(data.method == 'get')
  {
    // Read in a template as a string
    helpers.getTemplate('index', function(err, str)
    {
      if(!err && str)
      {
        callback(200, str, 'html');
      }
      else
      {
        callback(500, undefined, 'html');
      }
    });
  }
  else
  {
    callback(405, undefined, 'html');
  }
};


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
  //Create the phone variable for the get from the clients query string.
  //The variable will be loaded from the query string if validation is passed otherwise will be assigned the value false.
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




// Users - put handler
// Define the user's put subhandler function
// This function changes the record in the user's file. 
// Required data: phone
// Optional data: firstName, lastName, email, password, tosAgreement
// Note: At least one of the optional arguments must be specified.
// @TODO: Only let an authenticated user update their own object. 
// Do not let them update anyone else's
handlers._users.put = function(data, callback){

  // Check for the required field.
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





// Users - delete
// Define the user's delete subhandler function.
// This function deletes the user's file.
// Required field: phone
// @TODO: Only let an authenticated user delete their own file. Don't let them delete anyone else's.
// @TODO: Clean up (delete) any other data files associated with this user.
handlers._users.delete = function(data, callback){

  // Check that the phone number is valid.
  //Create the phone variable for the delete from the clients query string.
  //The variable will be loaded from the query string if validation is passed otherwise will be assigned the value false.
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