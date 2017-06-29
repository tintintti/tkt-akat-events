import React, { Component } from "react";
import "./Header.css";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {loggingIn: false};
        this.logout = this.logout.bind(this);
    }

    logout(event) {
        event.preventDefault();
        this.props.logout();
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="Header">
                <div id="titleDiv">
                    <a id="akat" href="/">TKT-AKAT</a>
                </div>
            <nav>
                    {this.props.isAuthenticated ?
                    <ul>
                    <li><button onClick={this.logout}>Kirjaudu ulos</button></li>
                    <li><a href="#/myevents">Omat tapahtumat</a></li>
                    <li><a href="/">Tapahtumat</a></li>
                    </ul>
                    :
                    <ul>
                        <li><a href="#/register">Rekisteröidy</a></li>
                        <li><a href="#/login">Kirjaudu</a></li>
                    </ul>
                }
            </nav>
            </div>
        )
    }
}

export default Header;
