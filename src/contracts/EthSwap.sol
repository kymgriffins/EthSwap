pragma solidity ^0.5.0;

import "./Token.sol";
contract EthSwap{

    string public name = "EthSwap";
    Token public token; 
    uint public rate = 100 ;

    event TokensPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );
     event TokensSold(
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

    //Ethswap has enough tokens 
    require(token.balanceOf(address(this)) >= tokenAmount);


        token.transfer(msg.sender, tokenAmount);
    // Emit an event when someone buys tokens
         emit TokensPurchased(msg.sender, address(token), tokenAmount , rate);
    }

    //sell tokens 

    function sellTokens(uint _amount) public{
        //User can't sell more tokens than they have 

        require(token.balanceOf(msg.sender)>= _amount);
        //calculate ammount of ether to redeem
        uint etherAmount = _amount / rate;

        // require that Eth Swap has enough ether 

        require(address(this).balance >= etherAmount);

        //sell the tokens - send ether to msg.sender(seller)
        token.transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(etherAmount);

        // emit an event when someone sells 
        emit TokensSold(msg.sender, address(token), _amount, rate );
    }
   
   
}