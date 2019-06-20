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
 * Include multiuser database functionality,  
 * [Generate truly random seeds](https://github.com/johnshearing/IOTA-Airgapped-NodeJS-Console-Wallet#generating-seeds-with-a-true-random-number-generator) not pseudo-random by virtue of special hardware built into the raspberry pi 2,  
 * [Generate addresses and keep track of balances in each address](https://github.com/johnshearing/IOTA-Airgapped-NodeJS-Console-Wallet#make-addresses-from-your-seeds-to-store-iotas),  
 * [Identify Healthy Nodes](https://github.com/johnshearing/IOTA-Airgapped-NodeJS-Console-Wallet#find-a-healthy-computer-on-the-tangle-to-use-for-checking-the-balance-of-your-new-address),   
 * [Check Balances for a single address or for a list of addresses](https://github.com/johnshearing/IOTA-Airgapped-NodeJS-Console-Wallet#check-your-balance-at-address-a0),   
   * The wallet will not check seed balances for security reasons.  
   * A list of addresses must be supplied. This will all be handled by the database.  
   * Working this way eliminates all confusion created by snap shots.  
 * [Bundle Transactions Offline then Broadcast Transactions Online,](https://github.com/johnshearing/IOTA-Airgapped-NodeJS-Console-Wallet#make-a-signed-transaction-bundle-and-broadcast-it-to-the-tangle)   
   * Users will see a visual representation of actions the bundle will perform as a check before broadcasting the bundle.  
 * [Handle Mult-Signatures building upon work found here](https://www.mobilefish.com/services/cryptocurrency/iota_multisig.html),  
 * MAM Masked Authenticated Messaging,  
 * Implement all the functionality available through Qubic as that comes online,  
 * Implement typical accounting functions such as AP, AR, GL, Inv ...  
 
 Check back often to follow the progress.  
 Feel free to make suggestions.  
 Thanks, John
