import React from "react";
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Web3Provider } from "context/Web3Context";
import { BallersProvider } from "context/BallersContext";

import Header from "components/Header";

import Dashboard from "views/Dashboard";
import Collection from "views/Collection";

const App = () => {
  return (
    <Router>
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
          </Switch>
        </BallersProvider>
      </Web3Provider>
    </Router>
  );
}

export default App;
