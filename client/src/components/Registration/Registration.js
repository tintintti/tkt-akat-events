import React, { Component } from "react";
import Question from "./Question";
import "./Registration.css";
import _ from "lodash";

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            questions: {},
            hasRegistered: false
        };
        this.renderQuestions = this.renderQuestions.bind(this);
        this.bindState = this.bindState.bind(this);
        this.register = this.register.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
    }

    addAnswer(question) {
        let qs = _.clone(this.state.questions);
        qs[question.q] = question.a;
        this.setState({questions: qs});
    }

    bindState(property) {
        return (event) => { this.setState({[property]: event.target.value}) };
    }

    register() {
        let participant = _.cloneDeep(this.state);
        participant.questions = [];
        for (let q of this.props.questions) {
            participant.questions.push({q: q, a: this.state.questions[q]});
        }
        fetch("/api/events/" + this.props.eventID + "/participants", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(participant)
        }).then(() => {
            this.props.update();
            this.setState({
                hasRegistered: true
            });
        })
    }

    renderQuestions() {
        return this.props.questions.map(q => (
            <Question key={q} question={q} add={this.addAnswer} />
        ));
    }

    render() {
        if (!this.state.hasRegistered) {
            return (
                    <div className="registration">
                        <h4>Ilmoittautuminen</h4>
                        <label>Nimi<br/>
                            <input value={this.state.name} onChange={this.bindState("name")}/></label><br/>
                        <label>Sähköpostiosoite<br/>
                            <input value={this.state.email} onChange={this.bindState("email")}/></label><br/>
                        {this.renderQuestions()}
                        <button onClick={this.register}>Ilmoittaudu</button>
                    </div>

            );
        }
        return (<div className="registration"><p className="message">Kiitos ilmoittautumisesta!</p></div>);
    }
}

export default Registration;
