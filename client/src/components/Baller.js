import React, { useCallback, useContext } from "react";
import styled from "styled-components";

import Web3Context from "context/Web3Context";
import getBallerFromData from "utils/getBallerFromData";

const Baller = ({
  baller,
  canClaim,
  canRelease
}) => {
  const {
    id,
    data,
    ownerAssignedNumber,
    ownerAssignedName,
  } = baller;

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

  const { position, outsideScoring, insideScoring, defense, rebounding, playmaking, athleticism } = getBallerFromData(data);

  return (
    <BallerWrapper>
      <NumberAndPosition>
        <NumberBig>{id}</NumberBig>

        <Position>{position}</Position>
      </NumberAndPosition>

      <NameWrapper>
        <Name>
          {ownerAssignedName || 'No Name'}
        </Name>
      </NameWrapper>

      <Stats>
        <Stat>
          <Label>OUT</Label>
          <Rating>{outsideScoring}</Rating>
        </Stat>

        <Stat>
          <Label>INS</Label>
          <Rating>{insideScoring}</Rating>
        </Stat>

        <Stat>
          <Label>DEF</Label>
          <Rating>{defense}</Rating>
        </Stat>

        <Stat>
          <Label>REB</Label>
          <Rating>{rebounding}</Rating>
        </Stat>

        <Stat>
          <Label>PLA</Label>
          <Rating>{playmaking}</Rating>
        </Stat>

        <Stat>
          <Label>ATH</Label>
          <Rating>{athleticism}</Rating>
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

const NameWrapper = styled.div`
  text-align: center;
  padding: 24px 0;
  border-top: 1px solid #CCCCCC;
  border-bottom: 1px solid #CCCCCC;
  margin: 24px;
`;

const Name = styled.p`
  font-size: 18px;
  margin: 0;
  font-weight: 500;
`;

const Position = styled.span`
  font-size: 32px;
  font-weight: 600;
  color: #44567b;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  padding: 18px 16px 24px;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Label = styled.span`
  text-transform: uppercase;
  font-weight: 600;
  font-size: 14px;
  padding-bottom: 12px;
`;

const Rating = styled.span`
  font-size: 20px;
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

  background-color: ${({isClaim, theme}) => isClaim ? theme.colors.green : theme.colors.red};
`;

export default Baller;