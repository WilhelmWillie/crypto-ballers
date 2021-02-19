import React, { useContext, useMemo } from "react";
import styled from "styled-components";

import Web3Context from "../context/Web3Context";
import useBallers from "../hooks/useBallers";

import Baller from "./Baller";

const UnclaimedBallers = () => {
  const { contract } = useContext(Web3Context);

  const ballers = useBallers(contract.methods.getUnclaimedTokens());

  const ballerItems = useMemo(() => {
    if (ballers) {
      return (ballers.map(baller => (
        <Baller data={baller} key={baller.id} />
      )))
    }
  }, [ballers]);

  return (
    <UnclaimedBallersWrapper>
      <h2>Unclaimed Ballers</h2>

      <Ballers>
        {ballerItems}
      </Ballers>
    </UnclaimedBallersWrapper>
  )
}

const UnclaimedBallersWrapper = styled.div`
  flex-basis: 49%;
  padding: 32px;
  border: 1px solid #D4D7DB;

  h2 {
    margin: 0;
  }
`;

const Ballers = styled.div`
  margin-top: 32px;
`;

export default UnclaimedBallers;