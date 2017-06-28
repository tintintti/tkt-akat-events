import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: "", error: ""};
        this.bindState = this.bindState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    bindState(property) {
        return (event) => { this.setState({[property]: event.target.value}) };
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.props.login);
        this.props.login({email: this.state.email, password: this.state.password})
            .catch((error) => {
                this.setState({error: error});
            });
    }

    render() {
        return (
            <div className="Login">
                <h3>Kirjaudu</h3>
                <form className="loginForm" onSubmit={this.handleSubmit}>
                    <label>Sähköpostiosoite:<br/>
                    <input type="text" value={this.state.email} onChange={this.bindState("email")}/></label><br/>
                    <label>Salasana:<br/>
                    <input type="password" value={this.state.password} onChange={this.bindState("password")}/></label><br/>
                    {this.state.error ? <p className="errorMessage">{this.state.error}</p> : ""}
                    <button type="submit" >Kirjaudu</button>
                </form>
            </div>
        );
    }
}

export default Login;
