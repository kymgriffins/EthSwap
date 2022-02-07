pragma solidity ^0.5.0;

import "./Token.sol";
contract EthSwap{

    string public name = "EthSwap";
    Token public token; 
    uint public rate = 100 ;

    event TokenPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

    constructor(Token _token) public{
        token = _token;

    }
    function buyTokens() public payable{
        // Redemption Rate = # of tokens they receive for 1 ether
        // Amount of Etheruem * Redemptioin Rate
        uint tokenAmount =msg.value * rate;

//Ensure purchase of only available tokens
    require(token.balanceOf(address(this)) >= tokenAmount);


        token.transfer(msg.sender, tokenAmount);
 // Emit an event when someone buys tokens
         emit TokenPurchased(msg.sender, address(token), tokenAmount , rate);
    }
   
   
}