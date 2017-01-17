import React, { Component } from "react";
import "./Header.css";
import Login from "./Login";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {loggingIn: false};
        this.logout = this.logout.bind(this);
        this.showLogin = this.showLogin.bind(this);
        this.login = this.login.bind(this);
    }

    logout(event) {
        event.preventDefault();
        this.props.logout();
        this.props.history.push("/");
    }

    showLogin() {
        this.setState({loggingIn: true});
    }

    login(loginInfo) {
        this.setState({authenticated: true});
        this.props.login(loginInfo);
    }

    render() {
        return (
            <div className="Header">
            <nav>
                    {this.props.isAuthenticated ?
                    <ul>
                    <li><button onClick={this.logout}>Kirjaudu ulos</button></li>
                    <li><a href="/myevents">Omat tapahtumat</a></li>
                    <li><a href="/">Tapahtumat</a></li>
                    </ul>
                    :
                    <ul>
                    <li><Login login={this.props.login} /></li>
                    </ul>
                }
            </nav>
            </div>
        )
    }
}

export default Header;
