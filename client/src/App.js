import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Layout from "./components/Layout/Layout";
import LandingMain from "./components/LandingMain/LandingMain";
import Signup from "./containers/SignUpForm/SignUpForm";
import Login from "./containers/LoginForm/LoginForm";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import Error404 from "./components/404/404";

const App = () => {
  return (
    <BrowserRouter>
      <Layout isAuthenticated = {false}>
        <Switch>
          <Route exact path="/" component={LandingMain}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route path="/" component={Error404} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;