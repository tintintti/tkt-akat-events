import React, { Component } from "react";
import "./SignUp.css";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {password: "", email: "", name: ""};
        this.bindState = this.bindState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    bindState(property) {
        return (event) => { this.setState({ [property]: event.target.value })};
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch("/api/signup", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state)
        }).then(() => {
            window.location.replace("#/login");
        }).catch((err) => {
            console.error(err);
        })
    }

    render() {
        return (
            <div className="SignUp">
                <h3>Rekisteröidy</h3>
                <p>Rekisteröityneenä vot luoda tapahtumia.<br/>
                    Tapahtumiin ilmoittautumista varten ei tarvitse rekisteröityä.</p>
                <label>Nimi<br/>
                <input type="text" value={this.state.name} onChange={this.bindState("name")}/></label><br/>
                <label>Sähköpostiosoite<br/>
                <input type="text" value={this.state.email} onChange={this.bindState("email")}/></label><br/>
                <label>Salasana<br/>
                <input type="password" value={this.state.password} onChange={this.bindState("password")} /></label><br/>
                <button onClick={this.handleSubmit}>Rekisteröidy</button>
            </div>
        );
    }
}


export default SignUp;
