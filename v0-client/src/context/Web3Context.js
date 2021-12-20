import React, { createContext } from "react";

import useWeb3 from "hooks/useWeb3";
import Loading from "components/Loading";

const Web3Context = createContext(null);

const Web3Provider = ({children}) => {
  const {
    web3,
    accounts,
    contract,
    isReady
  } = useWeb3();

  if (!isReady) {
    return <Loading />;
  }

  return (
    <Web3Context.Provider value={{
      web3,
      accounts,
      contract,
      isReady
    }}>
      {children}
    </Web3Context.Provider>
  )
}

export {
  Web3Provider
};

export default Web3Context;