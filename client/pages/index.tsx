import { useEffect, useState, useCallback } from 'react'; 

import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import getWeb3 from '../utils/getWeb3';

import BallersContract from "../contracts/Ballers.json";

const Home: NextPage = () => {
  const [web3, setWeb3] = useState<any>(null);
  const [accounts, setAccounts] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [ownedBallerIds, setOwnedBallerIds] = useState<Array<number>>([]);
  
  useEffect(() => {
    const connectToContract = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
  
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
  
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = (BallersContract as any).networks[networkId];
        const instance = new web3.eth.Contract(
          (BallersContract as any).abi,
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

  useEffect(() => {
    if (web3 && accounts && contract) {
      const getBallerIds = async () => {
        const ballerIds = await contract.methods.getBallersByOwner(accounts[0]).call(); 
        setOwnedBallerIds(ballerIds);
      }
  
      if (contract) {
        getBallerIds();
      }

      const draftEvent = contract.events.Draft({ filter: { _minter: accounts[0] } }).on(
        "data",
        (event : any) => {
          const ballerId = event.returnValues._ballerId;
          setOwnedBallerIds([...ownedBallerIds, ballerId]);
        }
      );

      return () => {
        draftEvent.unsubscribe();
      }
    }
  }, [web3, accounts, contract, ownedBallerIds]);

  const handleDraftClick = useCallback(async () => {
    if (web3 && accounts && contract) {
      await contract.methods.draftBaller(1).send({
        from: accounts[0],
        value: web3.utils.toBN(10000000000000000)
      });
    }
  }, [web3, accounts, contract]);

  return (
    <div className={styles.container}>
      <h1>CryptoBallers</h1>

      <h2>Draft</h2>
      <button onClick={handleDraftClick}>Draft</button>

      <h2>Your Players</h2>
      <p>Below are your players...</p>
      <ul>
        {
          ownedBallerIds.map(ballerId => (
            <li key={ballerId}>{ballerId}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default Home
