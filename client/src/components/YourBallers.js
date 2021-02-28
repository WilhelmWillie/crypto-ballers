import React, { useContext, useMemo } from "react";
import styled from "styled-components";

import BallersContext from "context/BallersContext";

import Baller from "./Baller";

const YourBallers = () => {
  const { ownedBallers } = useContext(BallersContext);

  const ballerItems = useMemo(() => {
    if (ownedBallers) {
      return (ownedBallers.map(baller => (
        <Baller baller={baller} key={`owned-${baller.id}`} canRelease />
      )))
    }
  }, [ownedBallers]);

  return (
    <YourBallersWrapper>
      <h2>Your Ballers</h2>

      <Ballers>
        {ballerItems}
      </Ballers>
    </YourBallersWrapper>
  )
}

const YourBallersWrapper = styled.div`
  flex-grow: 1;
  margin-right: 32px;

  h2 {
    margin: 8px 0 0;
    color: #2A2A2A;
    font-size: 32px;
  }
`;

const Ballers = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 32px;
`;

export default YourBallers;