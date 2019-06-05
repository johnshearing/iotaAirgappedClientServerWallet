///////////////////////////////////////////////////////////////////////////////////////////////////////
/*
* Hash a string at the node console
* enter: var myHash = require('./hash-check')
* enter: myHash.hash('The rain in Spain')
* Later it will be fun to give this a web interface.
*/

// Dependencies
var crypto = require('crypto');

// Create a container for all the functions
var container = {};

container.hash = function(inputString){
    var hashResult = crypto.createHash('sha256').update(inputString).digest('base64');
    return hashResult;
};


// Export the module
module.exports = container;

//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
Use the following snippet to create a form in the DOM using chrome.
Right click over the HTML and click edit HTML

<form action="/users" method="post">
<textarea id="Message" name="Message"></textarea>
<button type="submit">Send Request</button>
</form>

The following is some data for the form
{
"firstName":"John",
"lastName":"Smith",
"phone":"5555555556",
"email":"john@gmail.com",
"password":"12345",
"tosAgreement":true
}

A valid json object uses double quotes.
*/