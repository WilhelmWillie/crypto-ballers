import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import { 
  Link
} from "react-router-dom";

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
        <Logo><Link to="/">Crypto Ballers</Link></Logo>

        <Navigation>
          <Link to="/">Dashboard</Link>
          <Link to="/collection">Your Collection</Link>
        </Navigation>

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
  background: ${p => p.theme.colors.dark};
  color: ${p => p.theme.colors.light};
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 24px;
  text-transform: uppercase;
  margin-right: 32px;

  a {
    text-decoration: none;
    color: #FFFFFF;
  }
`;

const Navigation = styled.div`
  flex-grow: 1;

  a {
    text-decoration: none;
    color: #FFFFFF;
    margin: 0 16px;
  }
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