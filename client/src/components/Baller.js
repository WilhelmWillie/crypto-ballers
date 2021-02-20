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
      <NumberAndPosition>
        <NumberBig>{id}</NumberBig>

        <Position>{positionLabel}</Position>
      </NumberAndPosition>

      <Stats>
        <Stat>
          <Label>Off</Label>
          <Rating>{offensiveRating}</Rating>
        </Stat>

        <Stat>
          <Label>Def</Label>
          <Rating>{defensiveRating}</Rating>
        </Stat>

        <Stat>
          <Label>Ovr</Label>
          <Rating>{Math.floor((parseFloat(offensiveRating) + parseFloat(defensiveRating))/2.0)}</Rating>
        </Stat>
      </Stats>

      {
        canClaim && (
          <Button onClick={claimBaller} isClaim>
            Claim
          </Button>
        )
      }

      {
        canRelease && (
          <Button onClick={releaseBaller}>
            Release
          </Button>
        )
      }
    </BallerWrapper>
  )
}

const BallerWrapper = styled.div`
  background: #F9F8F8;
  border-radius: 8px;
  padding-top: 32px;
  padding-bottom: 32px;
`;

const NumberAndPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`;

const NumberBig = styled.span`
  font-size: 72px;
  font-weight: 600;
  padding-right: 24px;
  color: #747b89;
`;

const Position = styled.span`
  font-size: 32px;
  font-weight: 600;
  color: #44567b;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding-top: 18px;
  padding-bottom: 24px;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Label = styled.span`
  text-transform: uppercase;
  font-weight: 600;
  font-size: 16px;
  padding-bottom: 12px;
`;

const Rating = styled.span`
  font-size: 24px;
`;

const Button = styled.button`
  display: block;
  width: 80%;
  margin: 0 auto;
  padding: 16px 0;
  font-size: 18px;
  text-transform: uppercase;
  border: none;
  border-radius: 8px;
  color: #FFFFFF;
  cursor: pointer;

  background-color: ${({isClaim}) => isClaim ? '#6E9075' : '#CE2D4F'};
`;

export default Baller;