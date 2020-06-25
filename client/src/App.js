import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Layout from "./components/Layout/Layout";
import LandingMain from "./components/LandingMain/LandingMain";
import Signup from "./containers/SignUpForm/SignUpForm";
import Login from "./containers/LoginForm/LoginForm";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import Calendar from "./containers/Calendar/Calendar";
import Settings from "./containers/Settings/Settings";
import UserMainPage from "./containers/UserMainPage/UserMainPage";
import Error404 from "./components/404/404";

const App = () => {
  return (
    <BrowserRouter>
      <Layout isAuthenticated = {true}>
        <Switch>
          <Route exact path="/" component={LandingMain}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/calendar" component={Calendar} />
          <Route exact path="/today" component={UserMainPage} />
          <Route exact path="/settings" component={Settings} />
          <Route path="/" component={Error404} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;