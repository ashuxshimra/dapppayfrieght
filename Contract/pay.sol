// PaymentContract.sol
// Import necessary modules and dependencies
pragma solidity ^0.8.0;

contract PaymentContract {
    address public owner;
    mapping(address => uint256) public balances;
    
    event PaymentReceived(address indexed from, uint256 amount);
    
    constructor() {
        owner = msg.sender;
    }
    
    function pay() public payable {
        require(balances[msg.sender] == 0, "Payment already made.");
        require(msg.value > 0, "Payment amount must be greater than zero.");
        
        balances[msg.sender] = msg.value;
        emit PaymentReceived(msg.sender, msg.value);
    }
    modifier onlyOwner{
          require(msg.sender==owner,"Not Consumer, so cannot pay money"); //whereever this is used in function it comes here checks , whoeover calling function that is msg.sender their address will be checked with owner address which was set in constructor duroing deployument , if not same then show errir
    _;
    }
}
