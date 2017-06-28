import React, { Component } from "react";
import "./SignUp.css";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {password: "", email: "", name: "", error: ""};
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
            body: JSON.stringify({
                'email': this.state.email,
                'password': this.state.password,
                'name': this.state.name
            })
        }).then((res) => {
            if (res.status === 200)
                window.location.replace("#/login");
            else {
                res.json().then((data) => {
                    this.setState({error: data.error})
                })
            }
        }).catch((err) => {
            console.error(err);
        })
    }

    render() {
        return (
            <div className="SignUp">
                <h3>Rekisteröidy</h3>
                <p>Rekisteröityneenä voit luoda tapahtumia.<br/>
                    Tapahtumiin ilmoittautuminen ei vaadi rekisteröitymistä.</p>
                <form onSubmit={this.handleSubmit}>
                    <label>Nimi<br/>
                    <input type="text" value={this.state.name} onChange={this.bindState("name")}/></label><br/>
                    <label>Sähköpostiosoite<br/>
                    <input type="text" value={this.state.email} onChange={this.bindState("email")}/></label><br/>
                    <label>Salasana<br/>
                    <input type="password" value={this.state.password} onChange={this.bindState("password")} /></label><br/>
                    {this.state.error ? <p className="errorMessage">{this.state.error}</p> : ""}
                    <button type="submit">Rekisteröidy</button>
                </form>
            </div>
        );
    }
}


export default SignUp;
