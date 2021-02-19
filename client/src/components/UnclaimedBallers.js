import React, { useContext, useMemo } from "react";
import styled from "styled-components";

import BallersContext from "../context/BallersContext";

import Baller from "./Baller";

const UnclaimedBallers = () => {
  const { unclaimedBallers } = useContext(BallersContext);

  const ballerItems = useMemo(() => {
    if (unclaimedBallers) {
      return (unclaimedBallers.map(baller => (
        <Baller data={baller} key={baller.id} canClaim />
      )))
    }
  }, [unclaimedBallers]);

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
  flex-basis: 66%;
  padding: 32px;
  border: 1px solid #D4D7DB;

  h2 {
    margin: 0;
  }
`;

const Ballers = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
`;

export default UnclaimedBallers;