import React, { Component } from "react";
import "./Logout.css";
import Auth from "../modules/Auth";

class Logout extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout() {
        this.props.logout();
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
