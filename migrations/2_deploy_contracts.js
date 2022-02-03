const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");


module.exports = async function(deployer) {
// Deploy EthSwap
  await deployer.deploy(EthSwap);
  const ethswap = await EthSwap.deployed();
  // Deploy Token
  await deployer.deploy(Token ); 
  const token = await Token.deployed(); 

  // Transfer ownership of Token to EthSwap
  await token.transfer (ethswap.address, '1000000000000000000000000');
};
