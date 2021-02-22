import React, { useContext, useMemo } from "react";
import styled from "styled-components";

import Web3Context from "context/Web3Context";

import Container from "./styles/Container";

const Header = () => {
  const { accounts } = useContext(Web3Context);

  const modifiedAddress = useMemo(() => {
    const address = accounts && accounts[0];

    if (address) {
      const firstFourCharacters = address.substring(0,4);
      const lastFourCharacters = address.substring(address.length-4);

      return `${firstFourCharacters}...${lastFourCharacters}`
    }
  }, [accounts]);

  return (
    <Wrapper>
      <StyledContainer>
        <Logo>Crypto Ballers</Logo>

        <Address>
          <Blip />
          <AddressText>{modifiedAddress}</AddressText>
        </Address>
      </StyledContainer>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  width: 100%;
  padding: 16px 0;
  background: #2B303A;
  color: #F9F8F8;
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 24px;
  text-transform: uppercase;
`;

const Address = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Blip = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #35A7FF;
`;

const AddressText = styled.span`
  padding-left: 8px;
`;

export default Header;