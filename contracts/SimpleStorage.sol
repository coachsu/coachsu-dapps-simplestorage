pragma solidity >= 0.4.22;

contract SimpleStorage {
    uint num;
    string text;

    constructor() public {
        num = 1;
        text = "Hello, World!";
    }

    function set(uint n, string calldata t) external {
        num = n;
        text = t;
    }

    function get() external view returns (uint, string memory) {
        return (num, text);
    }
}