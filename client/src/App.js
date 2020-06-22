import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Layout from "./components/Layout/Layout";
import LandingMain from "./components/LandingMain/LandingMain";
import Error404 from "./components/404/404";

const App = () => {
  return (
    <BrowserRouter>
      <Layout isAuthenticated = {true}>
        <Switch>
          <Route
              exact
              path="/"
              component={LandingMain}
            />
          <Route path="/" component={Error404} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;