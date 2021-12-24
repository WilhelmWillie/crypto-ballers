import { useEffect, useState, useCallback } from 'react'; 

import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Baller from '../components/Baller';

import BallersContract from "../contracts/Ballers.json";
import { useWeb3 } from '../hooks/useWeb3';

const Home: NextPage = () => {
  const [contract, setContract] = useState<any>(null);
  const [ownedBallerIds, setOwnedBallerIds] = useState<Array<number>>([]);
  
  const {
    web3,
    accounts,
    networkId
  } = useWeb3();
  
  useEffect(() => {
    try {
      if (!web3 || !networkId) return; 

      // Get the contract instance.
      const deployedNetwork = (BallersContract as any).networks[networkId];
      const instance = new web3.eth.Contract(
        (BallersContract as any).abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set contract to the state
      setContract(instance);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }, [web3, networkId]);

  useEffect(() => {
    if (accounts && contract) {
      const getBallerIds = async () => {
        const ballerIds = await contract.methods.getBallersByOwner(accounts[0]).call(); 
        setOwnedBallerIds(ballerIds);
      }
  
      getBallerIds();

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
  }, [accounts, contract, ownedBallerIds]);

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
            <Baller key={ballerId} ballerId={ballerId} />
          ))
        }
      </ul>
    </div>
  )
}

export default Home
