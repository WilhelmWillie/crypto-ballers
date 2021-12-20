import React, { useContext, useCallback } from "react";

import Web3Context from "context/Web3Context";
import TwoPanel from "components/TwoPanel";

const Mint = () => {
  const { contract, accounts } = useContext(Web3Context);

  const mintBaller = useCallback(async () => {
    if (contract) {
      await contract.methods.mintBaller().send({
        from: accounts[0]
      });
    }
  }, [contract, accounts]);

  return (
    <TwoPanel>
      <p>Let's mint</p>
      <button onClick={mintBaller}>Mint</button>
    </TwoPanel>
  )
}

export default Mint;