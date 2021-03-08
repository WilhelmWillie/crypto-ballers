import React, { useCallback, useContext } from "react";
import styled from "styled-components";

import Web3Context from "context/Web3Context";
import getBallerFromData from "utils/getBallerFromData";

import Jersey from "./Jersey";

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

  const { outsideScoring, insideScoring, defense, rebounding, playmaking, athleticism } = getBallerFromData(data);

  return (
    <BallerWrapper>
      <Jersey fill={`#${Number(data).toString(16).substring(0,6)}`} name={ownerAssignedName} number={ownerAssignedNumber} />

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

      <Actions>
        {
          canClaim && (
            <Button onClick={claimBaller}>
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
      </Actions>
    </BallerWrapper>
  )
}

const BallerWrapper = styled.div`
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  padding: 18px 16px 24px;
  background: #FFFFFF;
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

const Actions = styled.div`
  background: #FDF8F8;
  padding: 16px 24px;
`;

const Button = styled.a`
  color: #B2ACAC;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
`;

export default Baller;