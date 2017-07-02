import React, { Component } from 'react';
import Question from './Question';
import './Participant.css';

class Participant extends Component {
    constructor(props) {
        super(props);
        this.renderQuestions = this.renderQuestions.bind(this);
    }

    renderQuestions() {
        return this.props.participant.questions.map(question => (
            <Question question={question} key={question.q}/>
        ))
    }

    render() {
        return (
            <div className="participant">
            {this.props.participant.name}
                {this.props.token ?
                    <div className="participantInfo">
                        {this.props.participant.email}
                        <ul className="questions">{this.renderQuestions()}</ul>
                    </div>
                    : ""}
            </div>
        )
    }
}

export default Participant;
