import React, { createContext, useContext, useEffect } from "react";

import Web3Context from "./Web3Context";
import useBallers from "../hooks/useBallers";

const BallersContext = createContext(null);

const BallersProvider = ({children}) => {
  const {
    contract,
    accounts
  } = useContext(Web3Context);

  const [unclaimedBallers, addUnclaimedBallerId, removeUnclaimedBallerId] = useBallers(contract.methods.getUnclaimedTokens());
  const [ownedBallers, addOwnedBallerId, removeOwnedBallerId] = useBallers(contract.methods.getTokensByOwner(accounts[0]));

  useEffect(() => {
    const claimEvent = contract.events.Claim({ filter: { _claimer: accounts[0] } }).on(
      "data",
      (event) => {
        const ballerId = event.returnValues._ballerId;
        addOwnedBallerId(ballerId);
        removeUnclaimedBallerId(ballerId);
      }
    );

    const releaseEvent = contract.events.Release({ filter: { _releaser: accounts[0] } }).on(
      "data",
      (event) => {
        const ballerId = event.returnValues._ballerId;
        addUnclaimedBallerId(ballerId);
        removeOwnedBallerId(ballerId);
      }
    );

    return () => {
      // Clean up events
      claimEvent.unsubscribe();
      releaseEvent.unsubscribe();
    }
  }, []);

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