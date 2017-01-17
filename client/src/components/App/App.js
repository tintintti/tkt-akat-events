import React, { Component } from "react";
import Header from "../Header/Header";
import EventList from "../EventList/EventList";
import MyEvents from "../MyEvents/MyEvents";
import Auth from "../../modules/Auth";
import "./App.css"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {isAuthenticated: Auth.isAuthenticated(), path: "events"};
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.showEvents = this.showEvents.bind(this);
        this.showMyEvents = this.showMyEvents.bind(this);
    }

    login(loginInfo) {
        fetch("/api/login", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginInfo)
        }).then(response => response.json())
        .then( msg => {
            Auth.authenticateUser(msg.token);
            this.setState({isAuthenticated: true});
        }).catch(err => {
            console.error(err);
        })
    }

    logout() {
        Auth.deauthenticateUser();
        this.setState({isAuthenticated: false, path: "events"});
    }

    showMyEvents() {
        this.setState({path: "myevents"});
    }

    showEvents() {
        this.setState({path: "events"});
    }

    render() {
        return (
        <div className="App">
            <Header
                isAuthenticated={this.state.isAuthenticated}
                login={this.login}
                logout={this.logout}
                myevents={this.showMyEvents}
                events={this.showEvents}
            />
            {this.state.path === "myevents" ?
                <MyEvents />
                :
                <EventList />
            }
        </div>
    );
    }
}

export default App;
