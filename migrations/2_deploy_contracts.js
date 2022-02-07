const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");


module.exports = async function(deployer) {

  // Deploy Token
  await deployer.deploy(Token ); 
  const token = await Token.deployed(); 
  // Deploy EthSwap
  await deployer.deploy(EthSwap , token.address);
  const ethswap = await EthSwap.deployed();

  // Transfer ownership of Token to EthSwap
  await token.transfer (ethswap.address, '1000000000000000000000000');
};
