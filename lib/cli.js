/*
*
* CLI Related Tasks
*
*/


// Dependencies
const readline = require('readline');
const util = require('util');
const debug = util.debuglog('cli');
const events = require('events');
class _events extends events{};
var e = new _events();
var os = require('os');
var v8 = require('v8');
var _data = require('./data');



// Instantiate the CLI module object
var cli = {};




// Input handlers
// These event handlers map the user inputs to the responder functions the user wants to evoke.
e.on('man', function(str)
{
  cli.responders.help();
});

e.on('help', function(str)
{
  cli.responders.help();
});

e.on('exit', function(str)
{
  cli.responders.exit();
});

e.on('stats', function(str)
{
  cli.responders.stats();
});

e.on('list users', function(str)
{
  cli.responders.listUsers();
});

e.on('more user info', function(str)
{
  cli.responders.moreUserInfo(str);
});

e.on('list checks', function(str)
{
  cli.responders.listChecks(str);
});

e.on('more check info', function(str)
{
  cli.responders.moreCheckInfo(str);
});

e.on('list logs', function(str)
{
  cli.responders.listLogs();
});

e.on('more log info', function(str)
{
  cli.responders.moreLogInfo(str);
});
// End of Input handlers



// Responders object
// This object gets populated with matching response functions for the user input
cli.responders = {};




// Start of Section: The CLI Responders
// These responder functions perform the actions requested by the administrator from the Command Line Interface.




// help / man
// This function outputs a menu to the console of all the things an administrator can do using the CLI.
cli.responders.help = function()
{
    var commands = 
    {
        'exit' : 'Kill the CLI (and the rest of the application).',
        'man' : 'Show this help page.',
        'help' : 'Alias of the man command. Shows this help page.',
        'stats' : 'Get statistics on the underlying operating system and the resource utilization.',
        'list users' : 'Show a list of all the registered (undeleted) users in the system.',
        'more user info --userId' : 'Show details of the specifed user.',
        'list checks [--up] | [--down]' : 'Show a list of all the active checks in the system, including their state.',
        'more check info --checkId' : 'Show details of a specifed check.',
        'list logs' : 'Show a list of all the log files avaiable to be read, (compressed and uncompressed).',
        'more log info --fileName' : 'Show details of a specifed log file.'
    };

    // Show a header for the help page that is as wide as the screen.
    cli.horizontalLine();
    cli.centered('CLI MANUAL');
    cli.horizontalLine();
    cli.verticalSpace(2);
    

    // Show each command, followed by its explaination, in white and yellow respectively.
    for(var key in commands)
    {
        if(commands.hasOwnProperty(key))
        {
            var value = commands[key];
            var line = '      \x1b[33m '+key+'      \x1b[0m';
            var padding = 60 - line.length;
            for(i = 0; i < padding; i++)
            {
                line += ' ';
            };
            line += value;
            console.log(line);
            cli.verticalSpace();
        };
    };

    cli.verticalSpace(1);
    
    // End with another horizontal line
    cli.horizontalLine();

}; // End of: cli.responders.help = function(){...}
// End of: This function outputs a menu to the console of all the things an administrator can do using the CLI.
// End of: help / man




// Exit
cli.responders.exit = function()
{
    process.exit(0);
};




// Stats
cli.responders.stats = function()
{
    // Compile an object of stats
    var stats = 
    {
        'Load Average' : os.loadavg().join(' '),
        'CPU Count' : os.cpus().length,
        'Free Memory' : os.freemem(),
        'Current Malloced Memory' : v8.getHeapStatistics().malloced_memory,
        'Peak Malloced Memory' : v8.getHeapStatistics().peak_malloced_memory,
        'Allocated Heap Used (%)' : Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size) * 100),
        'Available Heap Allocated (%)' : Math.round((v8.getHeapStatistics().total_heap_size / v8.getHeapStatistics().heap_size_limit) * 100),
        'Uptime' : os.uptime() + ' Seconds',                                                        
    };

    // Show a header for the stats page that is as wide as the screen.
    cli.horizontalLine();
    cli.centered('SYSTEM STATISTICS');
    cli.horizontalLine();
    cli.verticalSpace(2);    

    // Show each command, followed by its explaination, in white and yellow respectively.
    for(var key in stats)
    {
        if(stats.hasOwnProperty(key))
        {
            var value = stats[key];
            var line = '      \x1b[33m '+key+'      \x1b[0m';
            var padding = 60 - line.length;
            for(i = 0; i < padding; i++)
            {
                line += ' ';
            };
            line += value;
            console.log(line);
            cli.verticalSpace();
        };
    };

    cli.verticalSpace(1);
    
    // End with another horizontal line
    cli.horizontalLine();    

};
// End of: Stats




// List users
cli.responders.listUsers = function()
{
    console.log('You asked to list users.');
};

// More user info
cli.responders.moreUserInfo = function(str)
{
    console.log('You asked for more user info.', str);
};

// List checks
cli.responders.listChecks = function(str)
{
    console.log('You asked to list checks.', str);
};

// More check info
cli.responders.moreCheckInfo = function(str)
{
    console.log('You asked for more check info.', str);
};

// List logs
cli.responders.listLogs = function()
{
    console.log('You asked to list logs.');
};

// More log info
cli.responders.moreLogInfo = function(str)
{
    console.log('You asked for more log info.', str);
};




// End of Section: The CLI Responders




// Start of Section: Support functions for the response handlers

// Create a vertical space
cli.verticalSpace = function(lines)
{
    lines = typeof(lines) == 'number' && lines > 0 ? lines : 1;
    for(i = 0; i < lines; i++)
    {
        console.log('');
    };
};




// Create a horizontal line across the screen
cli.horizontalLine = function()
{
    // Get the available screen size
    var width = process.stdout.columns;

    var line = '';

    // Form a line using dashes that is exactly equal to the width of the screen
    for(i = 0; i < width; i++)
    {
        line += '_';
    };

    console.log(line);

}; // End of: cli.horizontalLine = function(){...}
// End of: Create a horizontal line across the screen


// End of Section: Support functions for the response handlers




// Pad the left side of a string so that it centers on the screen
cli.centered = function(str)
{
    str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : ''; 

    // Get the available screen size
    var width = process.stdout.columns;

    // Calculate the left padding required to center the string
    var leftPadding = Math.floor((width - str.length) / 2);

    // Start with an empty line.
    var line = '';

    // Fill the line with the calculated amount of padding on the left side.
    for(i = 0; i < leftPadding; i++)
    {
        line += ' ';
    }
    
    // Append the string to the padding.
    line += str;

    console.log(line);

}; // End of: cli.centered = function(str){...}
// End of: Pad the left side of a string so that it centers on the screen




cli.processInput = function(str)
{
  str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : false;

  // Only process the input if the user actually wrote something. Otherwise ignore.
  if(str)
  {
    // Codify the unique strings that identify the unique questions that a user is allowed to ask.
    var uniqueInputs = 
    [
        'man',
        'help',
        'exit',
        'stats',
        'list users',
        'more user info',
        'list checks',
        'more check info',
        'list logs',
        'more log info'
    ];
    
    // Go through the possible inputs and emit an event when a match is found.
    var matchFound = false;
    var counter = 0;
    uniqueInputs.some(function(input)
    {
      if(str.toLowerCase().indexOf(input) > -1)
      {
        matchFound = true;
        
        // Emit an event matching the unique input and include the full string given by the user.
        e.emit(input, str);
        return true;
      }
    });

    // If no match is found then tell the user to try again.
    if(!matchFound)
    {
        console.log('Sorry, no match found. Try again.')
    };

  };
}; // End ofP cli.processInput = function(str){...}
// End of: Input processor




// Init script
cli.init = function()
{
  // Send to console, in dark blue
  console.log('\x1b[32m%s\x1b[0m','The CLI is running');

  // Start the interface
  var _interface = readline.createInterface(
  {
    input: process.stdin,
    output: process.stdout,
    prompt: 'command:'
  }
  );  

  // Create an initial prompt
  _interface.prompt();


  // Handle each line of input separately
  _interface.on('line', function(str)
  {
    // Send to the input processor.
    cli.processInput(str);

    // Re-initialize the prompt again to keep this prompt alive after the _interface.on event was received.
    _interface.prompt();

    // If the user stops the CLI, kill the associated process.
    _interface.on('close', function(str)
    {
        process.exit(0);
    });

  }); // End of: _interface.on('line', function(str){...}
}; // End of: cli.init = function(){...}
// End of: // Init script




// Export the module
module.exports = cli;
 