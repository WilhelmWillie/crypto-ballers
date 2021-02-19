import React, { useContext, useMemo } from "react";
import styled from "styled-components";

import BallersContext from "../context/BallersContext";

import Baller from "./Baller";

const YourBallers = () => {
  const { ownedBallers } = useContext(BallersContext);

  const ballerItems = useMemo(() => {
    if (ownedBallers) {
      return (ownedBallers.map(baller => (
        <Baller data={baller} key={`owned-${baller.id}`} canRelease />
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
  flex-basis: 33%;
  padding: 32px;
  border: 1px solid #D4D7DB;

  h2 {
    margin: 0;
  }
`;

const Ballers = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
`;

export default YourBallers;