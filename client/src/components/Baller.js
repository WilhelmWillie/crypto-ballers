import React from "react";
import styled from "styled-components";

const Baller = ({
  data
}) => {
  const {
    id,
    position,
    offensiveRating,
    defensiveRating
  } = data;

  return (
    <BallerWrapper>
      <h3>#{id} - Pos: {position}</h3>
      <p>
        <b>Offensive Rating = {offensiveRating}</b>
      </p>

      <p>
        <b>Defensive Rating = {defensiveRating}</b>
      </p>
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