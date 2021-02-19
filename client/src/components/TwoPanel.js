import React from "react";
import styled from "styled-components";

const TwoPanel = ({
  children
}) => {
  return (
    <TwoPanelWrapper>
      {children}
    </TwoPanelWrapper>
  )
}

const TwoPanelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 960px;
  margin: 32px auto;
  padding: 16px;
  border: 1px solid #D4D7DB;
  text-align: center;
`;

export default TwoPanel;