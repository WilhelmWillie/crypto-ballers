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
  align-self: flex-start;
  width: 100%;
  max-width: 400px;
  padding: 32px;
  background: #F9F8F8;
  border-radius: 12px;

  h2 {
    margin: 8px 0 0;
    color: #2A2A2A;
    font-size: 32px;
  }
`;

const Ballers = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
`;

export default YourBallers;