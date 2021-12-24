import { useEffect, useState, createContext, FunctionComponent } from 'react';

import Web3 from "web3";

type Web3Context = {
  isReady: boolean;
  web3: Web3 | null;
  accounts: string[] | null;
  networkId: number | null;
}

export const Web3Context = createContext<Web3Context | undefined>(undefined);

export const Web3Provider : FunctionComponent = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [accounts, setAccounts] = useState<string[] | null>(null);
  const [networkId, setNetworkId] = useState<number | null>(null);

  useEffect(() => {
    const getWeb3 = async () => {
      // @ts-expect-error TODO: fix window typing
      const ethereum = window.ethereum;

      if (ethereum) {
        const web3 = new Web3(ethereum);

        try {
          await ethereum.enable();
          setWeb3(web3);

          const [
            accounts,
            networkId
          ] = await Promise.all([
            web3.eth.getAccounts(),
            web3.eth.net.getId(),
          ]);

          setAccounts(accounts);
          setNetworkId(networkId);

          setIsReady(true);
        } catch (error) {
          console.error(error);
        }
      // @ts-expect-error TODO: fix window typing
      } else if (window.web3) {
        // @ts-expect-error TODO: fix window typing
        setWeb3(window.web3);
      }
    }

    window.addEventListener("load", getWeb3);

    return () => {
      window.removeEventListener("load", getWeb3);
    }
  }, []);

  return (
    <Web3Context.Provider value={{
      isReady,
      web3,
      accounts,
      networkId
    }}>
      {children}
    </Web3Context.Provider>
  )
}