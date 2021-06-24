# coachsu-dapps-simplestorage
## 專案描述
此專案是以[Truffle](https://www.trufflesuite.com/truffle)完成極為簡單的去中心化應用程式(DApps)。

其中，在以太坊區塊鏈上執行之智能合約的狀態包含

* ```uint num``` (256位元的無號整數)
* ```string text``` (字串)

並提供兩個函數 

* ```function set(uint n, string calldata t)``` (改變智能合約狀態)
* ```function get() external view returns (uint, string memory)``` (取得智能合約狀態)

## 部署智能合約
請先確定電腦上已正確安裝[Truffle](https://www.trufflesuite.com/truffle)。如果需要模擬區塊鏈網路，可考慮安裝[Ganache](https://www.trufflesuite.com/ganache)。

### 1. 進入Truffle Console
開啟**終端機1**進入專案目錄後執行

```shell
    truffle develop
```

啟用Truffle Console並建立開發測試用的以太坊區塊鏈(develop)。

### 2. 編譯、測試、與部署智能合約
在**終端機1**的Truffle Console下依序執行

```shell
    compile
    test
    migrate --reset
```

<span style="color:red">在測試智能合約結束前請保持Truffle Console開啟</span>。

## 測試智能合約
### 1. 執行測試程式(Python)
開啟**終端機2**進入專案目錄後依序執行

```shell
    cd src
    python -m venv pdapps
    ./pdapps/Script/activate
    pip install web3
    python app.py
    deactivate
```

### 2. 執行測試程式(Node.js)
在**終端機2**中依序執行

```shell
    npm install web3
    node app.js
```

### 3. 關閉Truffle Console
測試智能合約結束後，在**終端機1**的Truffle Console下執行

```shell
    .exit
```

離開Truffle Console。

## 部署智能合約到以太坊模擬環境(Ganache)
待續...