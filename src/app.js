const Web3 = require('web3');
const fs = require('fs');

// Geth節點(預設是development)
var web3 = new Web3(Web3.givenProvider || "http://localhost:9545");

web3.eth.getAccounts().then(function(accounts) {
    // from位址(從web3取得)
    sender = accounts[0];
    // 從Truffle取得智能合約資訊
    trufflefile = JSON.parse(fs.readFileSync('../build/contracts/SimpleStorage.json'));
    abi = trufflefile['abi'];
    address = trufflefile['networks']['5777']['address'];
    // 取得智能合約實例
    contract = new web3.eth.Contract(abi, address);

    // 呼叫智能合約函數(取得資料不需要發送交易)
    contract.methods.get().call().then((res)=>{console.log(res)});
    // 呼叫智能合約函數(更改資料需要發送交易)
    contract.methods.set(1, 'Hello, World!').send({'to':address, 'from': sender}).then((receipt)=>{
        // 呼叫智能合約函數(取得資料不需要發送交易)
        contract.methods.get().call().then((res)=>{console.log(res)}); 
    });
});