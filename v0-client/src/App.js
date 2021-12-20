import React from "react";
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ThemeProvider } from 'styled-components';

import { Web3Provider } from "context/Web3Context";
import { BallersProvider } from "context/BallersContext";

import Header from "components/Header";

import Dashboard from "views/Dashboard";
import Collection from "views/Collection";
import Mint from "views/Mint";

import theme from 'styles/theme';
import GlobalStyle from 'styles/GlobalStyle';

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Web3Provider>
          <BallersProvider>
            <Header />

            <Switch>
              <Route path="/" exact>
                <Dashboard />
              </Route>

              <Route path="/collection">
                <Collection />
              </Route>

              <Route path="/mint">
                <Mint />
              </Route>
            </Switch>
          </BallersProvider>
        </Web3Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
