import React, { Component } from "react";
import { browserHistory } from 'react-router';
import Header from "../Header/Header";
import Routes from "../../routes";
import Auth from "../../modules/Auth";
import "./App.css"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {isAuthenticated: Auth.isAuthenticated()};
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
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
        this.setState({isAuthenticated: false});
    }

    render() {
        return (
        <div className="App">
            <Header
                isAuthenticated={this.state.isAuthenticated}
                login={this.login}
                logout={this.logout}
                history={browserHistory}
            />
            <Routes history={browserHistory} />
        </div>
    );
    }
}

export default App;
