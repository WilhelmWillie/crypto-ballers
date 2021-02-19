import React, { useCallback, useContext } from "react";
import styled from "styled-components";

import Web3Context from "../context/Web3Context";

const Baller = ({
  data,
  canClaim,
  canRelease
}) => {
  const {
    id,
    position,
    offensiveRating,
    defensiveRating
  } = data;

  const { contract, accounts } = useContext(Web3Context);

  const claimBaller = useCallback(async () => {
    if (id && contract) {
      await contract.methods.claimBaller(id).send({
        from: accounts[0]
      });
    }
  }, [id, contract]);

  const releaseBaller = useCallback(async () => {
    if (id && contract) {
      await contract.methods.releaseBaller(id).send({
        from: accounts[0]
      });
    }
  }, [id, contract]);

  const positionLabel = (
    position === '5' ? 'C' :
    position === '4' ? 'PF' :
    position === '3' ? 'SF' :
    position === '2' ? 'SG' :
    position === '1' ? 'PG' : 'N/A'
  );

  return (
    <BallerWrapper>
      <h3>#{id} - Pos: {positionLabel}</h3>
      <p>
        <b>Offensive Rating = {offensiveRating}</b>
      </p>

      <p>
        <b>Defensive Rating = {defensiveRating}</b>
      </p>

      {
        canClaim && (
          <button onClick={claimBaller}>
            Claim
          </button>
        )
      }

      {
        canRelease && (
          <button onClick={releaseBaller}>
            Release
          </button>
        )
      }
    </BallerWrapper>
  )
}

const BallerWrapper = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid #EDEDED;

  :last-child {
    border-bottom: none;
  }
`;

export default Baller;