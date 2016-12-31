import React, { Component } from "react";
import "../styles/Logout.css";
import Auth from "../modules/Auth";

class Logout extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout() {
        Auth.deauthenticateUser();
        this.props.update();
    };

    render() {
        return (
            <div className="Logout">
            <button onClick={this.logout}>Kirjaudu ulos</button>
            </div>
        );
    }
}

export default Logout;
