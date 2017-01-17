import React from "react";
import { Router, Route } from "react-router";
import Auth from "./modules/Auth";
import EventList from "./components/EventList/EventList";
import MyEvents from "./components/MyEvents/MyEvents";

function requireAuth(nextState, replaceState) {
    if(!Auth.isAuthenticated())
        replaceState({nextPathname: nextState.location.pathname}, "/");
}

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={EventList} />
        <Route path="/myevents" component={MyEvents} onEnter={requireAuth} />
    </Router>
);

export default Routes;
