import React, { Component } from "react";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

class EditEventBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            start: "",
            creator: {id: "", name: ""},
            location: "",
            registration: true,
            registrationStart: "",
            registrationEnd: "",
            maxAttending: "",
            questions: [],
            newQuestion: "",
            eventType: "defaultImg"
        }
        this.bindState = this.bindState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.questions = this.questions.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
        this.registration = this.registration.bind(this);
        this.toggleRegistration = this.toggleRegistration.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    bindState(property) {
        return (event) => {
            if (event._isAMomentObject)
                this.setState({[property]: event.format('DD/MM/YYYY HH:mm')});
            else
                this.setState({[property]: event.target.value})
        };
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    cancel(event) {
        event.preventDefault();
    }

    addQuestion(event) {
        event.preventDefault();
        const q = this.state.newQuestion;
        this.setState({questions: this.state.questions.concat([q])}, () => {
            this.setState({newQuestion: ""});
            this.render();
        });
    }

    removeQuestion(event) {
        event.preventDefault();
        let questions = this.state.questions.slice();
        questions.splice(event.target.name, 1);
        this.setState({questions: questions}, () => {
            this.render();
        });
    }

    questions() {
        return this.state.questions.map((q, index) => {
            return <li key={index}>{q} <button className="tiny" name={index} onClick={this.removeQuestion}>-</button></li>;
        });
    }

    registration() {
        if(this.state.registration)
            return (
                <section>
                <label>Ilmoittautuminen alkaa:<br/>
                    <Datetime
                        value={this.state.registrationStart}
                        inputProps={{placeholder:'DD/MM/YYYY HH:mm'}}
                        onChange={this.bindState("registrationStart")}
                        closeOnSelect={true}
                        timeFormat="HH:mm"
                        dateFormat="DD/MM/YYYY"
                    /></label><br/>
                <label>Ilmoittautuminen loppuu:<br/>
                    <Datetime
                        value={this.state.registrationEnd}
                        inputProps={{placeholder:'DD/MM/YYYY HH:mm'}}
                        onChange={this.bindState("registrationEnd")}
                        closeOnSelect={true}
                        timeFormat="HH:mm"
                        dateFormat="DD/MM/YYYY"
                    /></label><br/>
                <label>Osallistujia enintään:<br/>
                <input placeholder="jätä tyhjäksi jos ei rajoitettu" type="number" value={this.state.maxAttending} onChange={this.bindState("maxAttending")} /></label><br/>
                Kysymykset:
                <ul>
                <li>Nimi</li>
                <li>Sähköpostiosoite</li>
                {this.questions()}
                </ul>
                <input type="text" value={this.state.newQuestion} onChange={this.bindState("newQuestion")} />
                <button className="tiny" onClick={this.addQuestion} >+</button><br/>
                </section>
            );
        return <br/>;
    }

    toggleRegistration(event) {
        this.setState({registration: event.target.checked}, () => {
            this.render();
        });
    }

    render() {
        return (
            <div className={this.state.className}>
                <h3>{this.props.title}</h3>
                <form className="eventForm" onSubmit={this.handleSubmit}>
                    <label>
                        Tapahtumakuva:<br/>
                        <div>
                            <label><input
                                onChange={this.bindState("eventType")}
                                type="radio" value="defaultImg"
                                checked={this.state.eventType === "defaultImg"}/>calendar <br/><div className="defaultImg small" /></label>
                        </div>
                        <div>
                            <label><input
                                onChange={this.bindState("eventType")}
                                type="radio" value="study"
                                checked={this.state.eventType === "study"}/>study <br/><div className="study small" /></label>
                        </div>
                        <div>
                            <label><input
                                onChange={this.bindState("eventType")}
                                type="radio" value="code"
                                checked={this.state.eventType === "code"}/>code <br/><div className="code small" /></label>
                        </div>
                        <div>
                            <label><input
                                onChange={this.bindState("eventType")}
                                type="radio" value="party"
                                checked={this.state.eventType === "party"}/>party <br/><div className="party small" /></label>
                        </div>
                        <div>
                            <label><input
                                onChange={this.bindState("eventType")}
                                type="radio" value="bar"
                                checked={this.state.eventType === "bar"}/>bar <br/><div className="bar small" /></label>
                        </div>
                        <div>
                            <label><input
                                onChange={this.bindState("eventType")}
                                type="radio" value="chill"
                                checked={this.state.eventType === "chill"}/>chill <br/><div className="chill small" /></label>
                        </div>
                    </label><br/>
                <label>Nimi:<br/><input type="text" value={this.state.title} onChange={this.bindState("title")} /></label><br/>
                <label>Aika:<br/>
                    <Datetime
                        value={this.state.start}
                        onChange={this.bindState("start")}
                        inputProps={{placeholder:'DD/MM/YYYY HH:mm'}}
                        closeOnSelect={true}
                        timeFormat="HH:mm"
                        dateFormat="DD/MM/YYYY"
                    /></label><br/>
                <label>Paikka:<br/><input type="text" value={this.state.location} onChange={this.bindState("location")} /></label><br/>
                <label>Vastuuhenkilö:<br/><p>{this.state.creator.name}</p></label><br/>
                <label>Kuvaus:<br/> <textarea value={this.state.description} onChange={this.bindState("description")} /></label><br/>
                <label><input type="checkbox" checked={this.state.registration} onChange={this.toggleRegistration} />
                Ilmoittautuminen</label><br/>
                {this.registration()}
                <br/>
                <button>Tallenna</button> <button onClick={this.cancel}>Peruuta</button>
                </form>
            </div>
        )
    }
}

export default EditEventBase;
