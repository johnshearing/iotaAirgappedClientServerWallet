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

// Define the Users post handler function.
// This function creates a new user file in the users directory.
// Required data: firstName, lastName, phone, email, password, tosAgreement.
handlers._users.post = function(data, callback)
{
  //Create variables for the post from the clients request object.
  //The variables will be loaded from the object if validation is passed otherwise will be assigned the value false.
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
                'password' : password,
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

// Users - get
// Required data: phone
// Optional data: none
// @TODO: Only let an authenticated user access their own object.
handlers._users.get = function(data, callback){

};

// Users - put
handlers._users.put = function(data, callback){

};

// Users - delete
handlers._users.delete = function(data, callback){

};

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



// Export the module.
module.exports = handlers;