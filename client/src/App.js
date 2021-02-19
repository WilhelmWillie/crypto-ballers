import React from "react";
import styled from "styled-components";

import Web3Context from "./context/Web3Context";
import useWeb3 from "./hooks/useWeb3";
import Header from "./components/Header";
import TwoPanel from "./components/TwoPanel";
import YourBallers from "./components/YourBallers";
import UnclaimedBallers from "./components/UnclaimedBallers";

import "./App.css";

const App = () => {
  const {
    web3,
    accounts,
    contract,
    isReady
  } = useWeb3();
  
  if (!isReady) {
    return (
      <LoadingContainer>
        <Loading>Loading Web3, accounts, and contract...</Loading>
      </LoadingContainer>
    );
  }

  return (
    <Web3Context.Provider value={{
      web3,
      accounts,
      contract,
    }}>
      <Header />
      <TwoPanel>
        <UnclaimedBallers />
        <YourBallers />
      </TwoPanel>
    </Web3Context.Provider>
  );
}

const LoadingContainer = styled.div`
  width: 400px;
  margin: 120px auto;
  padding: 64px;
  border: 1px solid #D4D7DB;
  text-align: center;
`;

const Loading = styled.b`
  font-size: 16px;
`;

export default App;
