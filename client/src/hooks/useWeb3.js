import { useEffect, useState, useMemo } from "react";

import BallerContract from "../contracts/Baller.json";
import getWeb3 from "../getWeb3";

function useWeb3() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const connectToContract = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
  
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
  
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = BallerContract.networks[networkId];
        const instance = new web3.eth.Contract(
          BallerContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
  
        // Set web3, accounts, and contract to the state
        setWeb3(web3);
        setAccounts(accounts);
        setContract(instance);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }

    connectToContract();
  }, []);

  const isReady = useMemo(() => {
    return web3 && accounts && contract;
  }, [web3, accounts, contract]);

  return {
    web3,
    accounts,
    contract,
    isReady
  }
}

export default useWeb3;