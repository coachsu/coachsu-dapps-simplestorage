import json
from web3 import Web3

# Geth節點(預設是development)
web3 = Web3(Web3.HTTPProvider('http://127.0.0.1:9545'))
# from位址(從web3取得)
sender = web3.eth.accounts[0];

# 從Truffle取得智能合約資訊
PATH_TRUFFLE_SC = '../build/contracts/SimpleStorage.json'
truffleFile = json.load(open(PATH_TRUFFLE_SC))
abi = truffleFile['abi']
address = truffleFile['networks']['5777']['address']
# 取得智能合約實例
contract = web3.eth.contract(abi = abi, address = address)

# 呼叫智能合約函數(取得資料不需要發送交易)
print(contract.functions.get().call())
# 呼叫智能合約函數(更改資料需要發送交易)
contract.functions.set(1,"Hello, World!").transact({'to': address, 'from': sender})
# 呼叫智能合約函數(取得資料不需要發送交易)
print(contract.functions.get().call())