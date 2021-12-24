import { useContext } from 'react'; 

import { Web3Context } from '../contexts/Web3Context';

export const useWeb3 = () => {
  const web3Context = useContext(Web3Context);

  if (!web3Context) {
    throw new Error('Web3 context was not defined. Make sure you use this in a child of Web3Provider');
  }

  return web3Context;
}