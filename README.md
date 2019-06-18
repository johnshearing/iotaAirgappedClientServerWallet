# iotaAirgappedClientServerWallet
 This is the last piece of the puzzle. This work in progress is a continuation of tutorial [IOTA-Airgapped-NodeJS-Console-Wallet](https://github.com/johnshearing/IOTA-Airgapped-NodeJS-Console-Wallet). When the wallet is finished a tutorial will be made in the style of [The NodeJS Master Class - No Frameworks, No NPM, No Dependencies](https://pirple.thinkific.com/courses/the-nodejs-master-class). No dependencies for easy auditing. The tutorial will explain each line of code so you can write everything from scratch if you want to. Client server architecture runs on a single airgapped [PrivateKeyVault](https://github.com/johnshearing/PrivateKeyVault) for individuals or on an airgapped network for large institutions or government. In the alternative, all this code will run on any device that runs NodeJS.  
 
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
 Right now I am working on getting the framework right.  
 Then building on top of the framework will go quickly.  
 The wallet will:  
 * [Generate truly random seeds](https://github.com/johnshearing/IOTA-Airgapped-NodeJS-Console-Wallet#generating-seeds-with-a-true-random-number-generator) not pseudo-random,  
 * Generate addresses,  
 * Identify Healthy Nodes,   
 * Check Balances,   
 * Bundle Transactions Offline,  
 * Broadcast Transactions Online,   
 * Handle Mult-Signatures,  
 * MAM Masked Authenticated Messaging,  
 * Implement all the functionality available through Qubic as that comes online,  
 * Include database functionality,  
 * Implement typical accounting functions such as AP, AR, GL, Inv ...  
 
 Check back often to follow the progress.  
 Feel free to make suggestions.  
 Thanks, John
