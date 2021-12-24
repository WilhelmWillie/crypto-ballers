import React, { useCallback, useEffect, useState, createContext, FunctionComponent } from 'react'; 

import BallersContract from "../contracts/Ballers.json";
import { useWeb3 } from '../hooks/useWeb3';

type BallersContext = {
  ownedBallerIds: number[];
  methods: {
    draft: (numberToDraft: number) => void;
  }
}

export const BallersContext = createContext<BallersContext | undefined>(undefined);

export const BallersProvider : FunctionComponent = ({ children }) => {
  const [ownedBallerIds, setOwnedBallerIds] = useState<number[]>([]);
  
  const [contract, setContract] = useState<any>(null);
  
  const {
    web3,
    accounts,
    networkId
  } = useWeb3();

  // Get contract instance
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
  
  // Get baller IDs
  useEffect(() => {
    if (!accounts || !contract) { return; }
    const getBallerIds = async () => {
      const ballerIds = await contract.methods.getBallersByOwner(accounts[0]).call(); 
      setOwnedBallerIds(ballerIds);
    }

    getBallerIds();
  }, [accounts, contract]);

  // Hook into Draft event 
  useEffect(() => {
    if (!contract || !accounts) return; 

    const draftEvent = contract.events.Draft({ filter: { _minter: accounts[0] } }).on(
      "data",
      (event : any) => {
        const ballerId = event.returnValues._ballerId;
        setOwnedBallerIds((prevOwnedBallerIds) => [...prevOwnedBallerIds, ballerId]);
      }
    );

    return () => {
      draftEvent.unsubscribe();
    }
  }, [contract, accounts]);

  // Draft callback 
  const handleDraft = useCallback(async (numberToDraft : number = 1) => {
    if (web3 && accounts && contract) {
      await contract.methods.draftBaller(numberToDraft).send({
        from: accounts[0],
        value: web3.utils.toBN(10000000000000000 * numberToDraft)
      });
    }
  }, [web3, accounts, contract]);

  return (
    <BallersContext.Provider value={{
      ownedBallerIds,
      methods: {
        draft: handleDraft
      }
    }}>
      {children}
    </BallersContext.Provider>
  )
}