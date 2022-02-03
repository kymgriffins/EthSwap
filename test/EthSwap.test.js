const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");

require('chai')
.use(require('chai-as-promised'))
.should();

contract('EthSwap', (accounts) =>{
    describe('EthSwap deployment', async () =>{
        it('Contract has a name', async () =>{
            let ethSwap = await EthSwap.new();
            const name = await ethSwap.name();
            assert.equal(name, 'EthSwap');
        })
    })
    describe('Token deployment', async () =>{
        it('Contract has a name', async () =>{
            let token = await Token.new();
            const name = await token.name();
            assert.equal(name, 'DApp Token');
        })
    })
    
})