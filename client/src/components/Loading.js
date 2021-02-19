import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingText>Loading Web3, accounts, and contract...</LoadingText>
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  width: 400px;
  margin: 120px auto;
  padding: 64px;
  border: 1px solid #D4D7DB;
  text-align: center;
`;

const LoadingText = styled.b`
  font-size: 16px;
`;

export default Loading;