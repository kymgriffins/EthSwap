import React, { useEffect, useState } from 'react';

import Web3 from 'web3';

function App() {
  const [account , setAccount ] = useState('');
  const [balance , setBalance ] = useState(0);
  console.log("account", account);
  console.log(balance)
  useEffect(() => {
    async function load(){
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      console.log(accounts)
      //Get Balance EthSwap
      const ethBalance = await web3.eth.getBalance(accounts[0]);
      setBalance(ethBalance)
      console.log(ethBalance)
    }
    load();
  },[])
  
  return (
    <div>
      <h1>Hello {account}</h1>
    </div>
  );
}

export default App;