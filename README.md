# iotaAirgappedClientServerWallet
This is the last piece of the puzzle in [The PrivateKeyVault family of repositories](https://github.com/johnshearing).  
This work in progress is a continuation of tutorial [IOTA-Airgapped-NodeJS-Console-Wallet](https://github.com/johnshearing/IOTA-Airgapped-NodeJS-Console-Wallet).  
 
This wallet being constructed using the methods shown in the following tutorial:  
[The NodeJS Master Class - No Frameworks, No NPM, No Dependencies](https://pirple.thinkific.com/courses/the-nodejs-master-class)  
No dependencies makes for easy auditing.  

The app runs in the browser using NodeJS Client server architecture.  
It runs on a single airgapped [PrivateKeyVault](https://github.com/johnshearing/PrivateKeyVault) for individuals or on an airgapped network for large institutions or government. In the alternative, all this code will run on any device that runs NodeJS.  

When the wallet is finished, a video tutorial will be made explaining each line of code so you can write everything from scratch if you want to.  
 
 To use this code, simply install NodeJS on your device and clone this repository.  
 Then from the command line, cd into the folder where this repository has been cloned.  
 Now clone [IOTA's NodeJS JavaScript library](https://github.com/iotaledger/iota.js) into the current directory.  
 Next, run the following command to start the NodeJS server:  
 `node ./index.js`  
 Finally, open your browser and enter the following address:  
 `http://localhost:3000/`  
 You should see the application running in your browser.
 
 The app runs well but it doesn't do anything IOTA related yet.  
 IOTA functionality will be built in very shortly.  
 The focus now is on getting the framework right.  
 Then building on top of the framework will go quickly.  
 
 The wallet will:  
 * Have database functionality. 
   * Table locking and/or field locking will be used to make the application multiuser.  
   * Transaction rollbacks will be implemented if any part of the transaction fails.  
   * All records/documents in the database (no matter from what table/collection) will get their unique ids from a single incremented source so that every record/document has a system wide unique id that identifies when it was created with respect to all the other records/documents in the database. You will see why in a minute.  
   * Any adds, changes, or deletes to a record/document will be recorded in a log that captures the entire record/document in it's new state. This along with the system wide unique ids allows the entire database to be reconstructed to represent any point in history.  
   * There are 4 database choices to consider SQL, NoSQL, DIY, The Tangle. The application is being roughed out now with a DIY JSON database [taught by Leslie Lewis in his NodeJS Master Class](https://pirple.thinkific.com/courses/the-nodejs-master-class). Once there is something to play with it can be decided which database(s) should be used.  
 * Have a code generator.
   * Rather than writing post, get, put, delete and user interface functions for every table/collection, there will be templates instead that get populated with metadata including all the business rules that make each table/collection and each field unique. It is common practice to use templates and metadate for generating html and JavaScript on the fly for browser consumption. I am simply extending the practice for the server side NodeJS code as well.
   * First I am going to write a simple app and test it a bit. Then I will make the templates for every type of function using the simple app as a model. From that point on, any changes to the app are made in the templates and the metadata. After the changes are made, the application is regenerated. This way, major changes to functionality ripple down through the system without having to change the handlers for each table/collection and their user interfaces. This eliminates most programming errors and makes it possible to make big changes to the system as we try to figure out what works and what does not. I did this about 20 years ago using Delphi and SQL Server. It worked great. Now I am going to do it again using NodeJS and JavaScript.  
 * [Generate truly random seeds](https://github.com/johnshearing/IOTA-Airgapped-NodeJS-Console-Wallet#generating-seeds-with-a-true-random-number-generator) (not pseudo-random) with special hardware built into every raspberry pi 2, or use another method if you want,
 * [Identify healthy nodes](https://github.com/johnshearing/IOTA-Airgapped-NodeJS-Console-Wallet#find-a-healthy-computer-on-the-tangle-to-use-for-checking-the-balance-of-your-new-address),   
 * [Generate addresses and check balances for a single address or for a list of addresses](https://github.com/johnshearing/IOTA-Airgapped-NodeJS-Console-Wallet#check-your-balance-at-address-a0),   
   * The wallet does check seed balances for security reasons.  
   * A list of addresses is supplied by the database instead.  
   * Working this way also eliminates the confusion created by snap shots.  
 * [Bundle Transactions Offline then Broadcast Transactions Online,](https://github.com/johnshearing/IOTA-Airgapped-NodeJS-Console-Wallet#make-a-signed-transaction-bundle-and-broadcast-it-to-the-tangle)   
   * Users will see a visual representation of actions the bundle will perform as check before broadcasting bundle.  
   * If the bundle does not make it onto the tangle within a set period of time the bundle will be promoted, reattached, or rebroadcast.  
   * And if the bundle is still not accepted after several attempts then a text message will be transmitted to the senders phone.    
 * [Handle Multi-Signatures building upon work found here](https://www.mobilefish.com/services/cryptocurrency/iota_multisig.html),  
 * MAM Masked Authenticated Messaging,  
 * Implement all the functionality available through Qubic as that comes online,  
 * Implement typical accounting functions such as AP, AR, GL, Inv ...  
 
 Check back often to follow the progress.  
 Feel free to make suggestions or help with the coding.  
 Thanks, John
