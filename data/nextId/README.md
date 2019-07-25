This folder contains a file called gsuid.json  
The name is an acronym for Globally Sequential Unique ID.  

This is file contains a single number which is:  
1. Locked: A folder called "lock" is created with fs.mkdirSync(path[, options])  
2. Read: The number is read.  
3. Incremented: The number is incremented.  
4. Unlocked: The "lock" folder is deleted with fs.rmdirSync(path)  

The file is locked by creating a new folder called "lock" inside the nextId folder before the read is attempted.  
The operating system will not allow a second folder of the same name to be created in the nextId folder.  
So if another user attempts to read the gsuid while the lock folder exists then they will get an error stating that the lock folder can not be created because a file of the same name already exists. This error will be handled with several retries before failing.  

All records in the database (no matter from what table) will get their unique ids from this Globally Sequential Unique ID so that every record has a system wide unique identifier that tells when it was created with respect to all the other records in the database.  
Any adds, changes, or deletes to a record will be recorded in a history log that captures the entire record in it's new state and tells who made the entry and by what method.  
This along with the Globally Sequential Unique ID allows the entire database to be reconstructed to represent any point in history.  
