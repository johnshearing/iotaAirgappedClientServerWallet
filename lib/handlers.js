import { builtinModules } from "module";

/*
/
/Request handlers
/
*/

// Dependencies



// Define the handlers.
var handlers = {};

// Users handler
handlers.users = function(data, callback){
  var acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback);
  } else {
      callback(405);
  }
};

// Container for the user's submethods
handlers._users = {};

// Users - post
// Required data: firstName, lastName, phone, email, password, tosAgreement
// Optional data: none
handlers._users.post = function(data, callback){
  // Check that all required fields are filled out.
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;  
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;
};

// Users - get
handlers._users.get = function(data, callback){

};

// Users - put
handlers._users.put = function(data, callback){

};

// Users - delete
handlers._users.delete = function(data, callback){

};
data.payload.firstName.trim()
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