import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderWrapper>
      <h1>Crypto Ballers</h1>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.header`
  width: 100%;
  max-width: 960px;
  margin: 32px auto;
  padding: 32px;
  border: 1px solid #D4D7DB;
  text-align: center;
`;

export default Header;