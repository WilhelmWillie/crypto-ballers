import React from "react";

import { Web3Provider } from "./context/Web3Context";
import { BallersProvider } from "./context/BallersContext";

import Header from "./components/Header";
import TwoPanel from "./components/TwoPanel";
import YourBallers from "./components/YourBallers";
import UnclaimedBallers from "./components/UnclaimedBallers";

import "./App.css";

const App = () => {
  return (
    <Web3Provider>
      <BallersProvider>
        <Header />
        <TwoPanel>
          <UnclaimedBallers />
          <YourBallers />
        </TwoPanel>
      </BallersProvider>
    </Web3Provider>
  );
}

export default App;
