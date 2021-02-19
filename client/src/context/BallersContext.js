import React, { createContext, useContext } from "react";

import Web3Context from "./Web3Context";
import useBallers from "../hooks/useBallers";

const BallersContext = createContext(null);

const BallersProvider = ({children}) => {
  const {
    contract,
    accounts
  } = useContext(Web3Context);

  const unclaimedBallers = useBallers(contract.methods.getUnclaimedTokens());
  const ownedBallers = useBallers(contract.methods.getTokensByOwner(accounts[0]));

  return (
    <BallersContext.Provider value={{
      unclaimedBallers,
      ownedBallers,
    }}>
      {children}
    </BallersContext.Provider>
  )
}

export {
  BallersProvider
};

export default BallersContext;