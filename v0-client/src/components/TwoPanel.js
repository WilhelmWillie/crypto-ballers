import React from "react";
import styled from "styled-components";

import Container from "./styles/Container";

const TwoPanel = ({
  children
}) => {
  return (
    <TwoPanelWrapper>
      {children}
    </TwoPanelWrapper>
  )
}

const TwoPanelWrapper = styled(Container)`
  display: flex;
  justify-content: space-between;
  margin: 48px auto;
`;

export default TwoPanel;