This folder contains two files besides this README.md:  
The first file is called gsuid.json.  
The name is an acronym for Global Sequential Unique ID.  
This is text file contains just a single JSON object which looks like this: `{"nextId":1}`  
If the file does not exist then it must be created when before the system is used.  
An initialization script will be be created for this.  

All records in the database (no matter from what table) get their unique ids from this Global Sequential Unique ID so that every record has a system wide unique identifier that tells in what order it was created with respect to all the other records in the database.  

Most of this logic has already been implemented.  
Look in `data.js`. The functions are `gsuidLockReadIncUnlock()` and `nextId()`  

* Working with the gsuid.json goes as follows:  
  * Lock: The file is locked.  
  * Read: The nextId is read.  
    * This number is used to uniquely and chronologically identify all records in the database.  
    * The number is also used to track adds, updates, and deletes to all records in all tables.  
  * Incremented: The nextId is incremented.  
    * You can increment more than one if you need to secure a range of numbers.  
  * The file is unlocked.  

* The gsuid.json file is locked by creating a new folder called ("gsuid.lock") inside the dbHistory folder before the read is attempted.  
* The operating system will not allow a second folder of the same name to be created in the dbHistory folder.  
* So if a second user attempts to read the gsuid.json file the while the lock folder exists then the code will throw an error stating that the lock folder can not be created because a folder of the same name already exists.  
* This stops the second user's code from running which prevents a read of the nextId until the first user reads it, increments it, and removes the lock.  
* The second user's error is caught silently behind the scenes with several retries to lock the file before finally notifying the administrator if a lock can not be obtained.  
* The system signs the lock folder for the user by placing a text document into the folder which identifies the user. I may choose to let nodejs modify the properties of the folder instead.  
* The system will not allow anyone else to remove the folder and then only through the program logic to enforce security.  

The second file in this folder is called dbLog.json. If it does not exist then it must be created when the system is first used. This will be done in an initialization script. Any adds, changes, or deletes to a record will be recorded in dbLog.json which captures the entire record in it's new state and tells who made the entry, by what method and when the entry was made.  

This along with the Global Sequential Unique ID allows the entire database to be reconstructed to represent any point in history.  

The following has not been implemented yet but here is the plan:  
The dbLog.json file only gets appended to but it will be locked along with all other files that are part of the transaction. When the entire transaction has been completed then all the files will be unlocked. If the transaction can not be completed then everything will be rolled back to it's original state.  

Most of the database system will be relational (table-joins and indexes) but the parts that deal with seeds and addresses will be NoSQL. Relational because most accounting funtionality involves reporting which requires indexes and normalization for speed and schema so that there is consistant data to report on. However, when dealing with seeds and addresses, no reporting is involved but rather security is the primary concern.  

Both the Relational and NoSQL databases will be implemented as JSON text files.  
Inserting and deleting records in the middle of a text file is troublesome and slow so only appends will be allowed.  
Adding new record is no problem - just append it to the file.  
To update a record, a new JSON record will be appended to the file with updated information and the older record will be ignored.  
It probably makes sense to stream the file backwards when reading so that the newest record is encounterd first at which point the system stops searching.  

Deleted records will be marked as deleted and ignored.  
At regular intervals the database can be taken offline so that outdated and deleted records can actually be removed. 
I think this was called packing in the days of xbase.  










 

 
