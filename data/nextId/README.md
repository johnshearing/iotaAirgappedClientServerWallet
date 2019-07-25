This folder contains a file called gsuid.
The name is an acronym for Globally Sequential Unique ID.

This is file contains a single number which is:

Locked,
Read,
Incremented,
Unlocked.
The file is locked by creating a new directory called lock. If the


All records in the database (no matter from what table) will get their unique ids from a single Globally Sequential Unique ID so that every record has a system wide unique identifier that tells when it was created with respect to all the other records in the database.  
Any adds, changes, or deletes to a record will be recorded in a log that captures the entire record in it's new state and tells who made the entry and by what method.  
This along with the Globally Sequential Unique ID allows the entire database to be reconstructed to represent any point in history.  
