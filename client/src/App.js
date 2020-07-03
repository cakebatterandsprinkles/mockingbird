import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./components/Layout/Layout";
import LandingMain from "./components/LandingMain/LandingMain";
import Signup from "./containers/SignUpForm/SignUpForm";
import Login from "./containers/LoginForm/LoginForm";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import Calendar from "./containers/Calendar/Calendar";
import Settings from "./containers/Settings/Settings";
import UserMainPage from "./containers/UserMainPage/UserMainPage";
import * as actionTypes from "./store/actions/actionTypes";
import Error404 from "./components/404/404";
import "./App.css";

const App = (props) => {
  return (
    <BrowserRouter>
      <Layout isAuthenticated={props.isAuthenticated}>
        <Switch>
          <Route exact path="/" component={LandingMain} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
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

const mapDispatchToProps = (dispatch) => {
  return {
    setUserData: (userEmail) =>
      dispatch({
        type: actionTypes.setUserData,
        payload: { userEmail: userEmail },
      }),
  };
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.email,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
