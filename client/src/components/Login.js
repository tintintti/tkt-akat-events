import React, { Component } from 'react';
import Auth from '../modules/Auth';
import '../styles/Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
        this.bindState = this.bindState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    bindState(property) {
        return (event) => { this.setState({[property]: event.target.value}) };
    }

    handleSubmit() {
        fetch('/api/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        }).then(response => response.json())
        .then( msg => {
            Auth.authenticateUser(msg.token);
            this.props.update();
        }).catch(err => {
            console.error(err);
        })
    }

    render() {
        return (
            <div className="Login">
                <h4>Kirjaudu</h4>
                <label>Sähköpostiosoite<br/>
                <input type="text" value={this.state.email} onChange={this.bindState('email')}/></label><br/>
                <label>Salasana<br/>
                <input type="password" value={this.state.password} onChange={this.bindState('password')}/></label><br/>
                <button onClick={this.handleSubmit}>Kirjaudu</button>
            </div>
        );
    }
}

export default Login;
