import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: ""};
        this.bindState = this.bindState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    bindState(property) {
        return (event) => { this.setState({[property]: event.target.value}) };
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.login(this.state);
    }

    render() {
        return (
            <div className="Login">
                <label>Sähköpostiosoite:
                <input type="text" value={this.state.email} onChange={this.bindState("email")}/></label>
                <label>Salasana:
                <input type="password" value={this.state.password} onChange={this.bindState("password")}/></label>
                <button onClick={this.handleSubmit}>Kirjaudu</button>
            </div>
        );
    }
}

export default Login;
