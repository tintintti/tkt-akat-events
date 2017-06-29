import React from "react";
import { Router, Route } from "react-router";
import Auth from "./modules/Auth";
import EventList from "./components/EventList/EventList";
import MyEvents from "./components/MyEvents/MyEvents";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import EventFullPage from "./components/Event/EventFullPage";

function requireAuth(nextState, replaceState) {
    if(!Auth.isAuthenticated())
        replaceState({nextPathname: nextState.location.pathname}, "/");
}

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={EventList} />
        <Route path="myevents" component={MyEvents} onEnter={requireAuth} />
        <Route path="event/:id" component={EventFullPage} />
        <Route path="register" component={SignUp} />
        <Route path="login" component={() => (<Login login={props.login} />)} />
    </Router>
);

export default Routes;
