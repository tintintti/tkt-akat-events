import React, { Component } from "react";

class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            start: "",
            organiser: "",
            location: "",
            registration: true,
            registrationStart: "",
            registrationEnd: "",
            maxAttending: "",
            questions: [],
            newQuestion: ""
        }
        this.bindState = this.bindState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.questions = this.questions.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
        this.registration = this.registration.bind(this);
        this.toggleRegistration = this.toggleRegistration.bind(this);
    }

    bindState(property) {
        return (event) => { this.setState({[property]: event.target.value}) };
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    addQuestion() {
        const q = this.state.newQuestion;
        this.setState({questions: this.state.questions.concat([q])}, () => {
            this.render();
        });
    }

    removeQuestion(event) {
        let questions = this.state.questions.slice();
        questions.splice(event.target.name, 1);
        this.setState({questions: questions}, () => {
            this.render();
        });
    }

    questions() {
        return this.state.questions.map((q, index) => {
            return <li key={index}>{q} <input type="button" value="-" name={index} onClick={this.removeQuestion}/></li>;
        });
    }

    registration() {
        if(this.state.registration)
            return (
                <section>
                <label>Ilmoittautuminen alkaa:<br/><input type="text" placeholder="dd/mm/yyyy hh:mm"
                value={this.state.registrationStart} onChange={this.bindState("registrationStart")}></input></label><br/>
                <label>Ilmoittautuminen loppuu:<br/><input type="text" placeholder="dd/mm/yyyy hh:mm"
                value={this.state.registrationEnd} onChange={this.bindState("registrationEnd")}></input></label><br/>
                <label>Osallistujia enintään:<br/>
                <input placeholder="jätä tyhjäksi jos ei rajoitettu" type="number" value={this.state.maxAttending} onChange={this.bindState("maxAttending")}></input></label><br/>
                Kysymykset:
                <ul>
                <li>Nimi</li>
                <li>Sähköpostiosoite</li>
                {this.questions()}
                </ul>
                <input type="text" value={this.state.newQuestion} onChange={this.bindState("newQuestion")} />
                <input type="button" value="+" onClick={this.addQuestion} /><br/>
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
            <div className={this.props.cName}>
                <h3>{this.props.title}</h3>
                <form onSubmit={this.handleSubmit}>
                <label>Nimi:<br/><input type="text" value={this.state.title} onChange={this.bindState("title")} /></label><br/>
                <label>Aika:<br/> <input type="text" placeholder="dd/mm/yyyy hh:mm" value={this.state.start} onChange={this.bindState("start")}></input></label><br/>
                <label>Paikka:<br/><input type="text" value={this.state.location} onChange={this.bindState("location")}></input></label><br/>
                <label>Vastuuhenkilö:<br/> <input type="text" value={this.state.organiser} onChange={this.bindState("organiser")}></input></label><br/>
                <label>Kuvaus:<br/> <textarea value={this.state.description} onChange={this.bindState("description")} /></label><br/>
                <label><input type="checkbox" checked={this.state.registration} onChange={this.toggleRegistration} />
                Ilmoittautuminen</label><br/>
                {this.registration()}
                <br/>
                <button>Tallenna</button>
                </form>
            </div>
        )
    }
}

export default AddEvent;
