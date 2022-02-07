const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");

require('chai')
.use(require('chai-as-promised'))
.should();

function  tokens(n){
    return  web3.utils.toWei(n, 'ether');
}

contract('EthSwap', ([deployer, investor]) =>{
    let ethSwap, token
 
    before( async () =>{
        token = await Token.new();
        ethSwap = await EthSwap.new(token.address);
        await token.transfer(ethSwap.address, tokens('1000000'));
    })
    describe('EthSwap deployment', async () =>{
        it('Contract has a name', async () =>{
       
            const name = await ethSwap.name();
            assert.equal(name, 'EthSwap');
        })
    })
    describe('Token deployment', async () =>{
        it('Contract has a name', async () =>{
           
            const name = await token.name();
            assert.equal(name, 'DApp Token');
        })
    })

    it('contract has tokens', async () =>{
       
      
        
        let balance = await token.balanceOf(ethSwap.address);
        assert.equal(balance.toString(), tokens('1000000'));
    })
    describe('buyTokens()', async () =>{
 
        before( async () =>{
          let result
          // Purchase token b4 each example
            result = await ethSwap.buyTokens({from: investor, value: web3.utils.toWei('1', 'ether') });

            // checks logs to ensure event was emitted with the correct data 

            const event = result.logs[0].args;
            assert.equal(event.account, investor);
            assert.equal(event.token, token.address);
            assert.equal(event.amount.toString(), tokens('100').toString());
            assert.equal(event.rate.toString(), '100');


            console.log(result.logs[0].args);
        })
            it('Allows user to instantly purchase tokens from ethswap for a fixed price', async () =>{
              
                // check investor token balance after purchase
    
                let investorBalance = await token.balanceOf(investor);
                assert.equal(investorBalance.toString(), tokens('100'));
    
                //Check ethswap balance after purchase
    
                let ethSwapBalance = await token.balanceOf(ethSwap.address);
                assert.equal(ethSwapBalance.toString(), tokens('999900'));
    
                //ethswap balance 
                let ethSwapBalance2 = await web3.eth.getBalance(ethSwap.address);
                assert.equal(ethSwapBalance2.toString(), web3.utils.toWei('1', 'ether'));
    
    
               
            })
        })
        describe('sellTokens()', async () =>{
 
            before( async () =>{
              let result
              // approve tokens b4 purchase 
                await token.approve(ethSwap.address, tokens('100'), {from: investor})
                // investor sells tokens
              result = await ethSwap.sellTokens(tokens('100'), { from: investor})
              // checks logs to ensure event was emitted with the correct data 
              const event = result.logs[0].args;
            assert.equal(event.account, investor);
            assert.equal(event.token, token.address);
            assert.equal(event.amount.toString(), tokens('100').toString());
            assert.equal(event.rate.toString(), '100');
              
            })
                it('Allows user to instantly sell tokens to ethswap for a fixed price', async () =>{
                  
                     // check investor token balance after purchase
    
                let investorBalance = await token.balanceOf(investor);
                assert.equal(investorBalance.toString(), tokens('0'));
                 //Check ethswap balance after sell
    
                 let ethSwapBalance = await token.balanceOf(ethSwap.address);
                 assert.equal(ethSwapBalance.toString(), tokens('1000000'));
     
                 //ethswap balance 
                 let ethSwapBalance2 = await web3.eth.getBalance(ethSwap.address);
                 assert.equal(ethSwapBalance2.toString(), web3.utils.toWei('0', 'ether'));
    
                    // FAILURE : investor can't sell more tokens than they have 

                    await ethSwap.sellTokens(tokens('500'), {from: investor}).should.be.rejected;
                    
                   
                })
            })
    
})