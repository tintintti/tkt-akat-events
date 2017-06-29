import React, { Component } from "react";
import Participant from "./Participant";
import Registration from "../Registration/Registration";

class ParticipantList extends Component {
    constructor(props) {
        super(props);
        this.state = {participants: []}
        this.getParticipants = this.getParticipants.bind(this);
        this.renderParticipants = this.renderParticipants.bind(this);
        this.getParticipants(props.event._id);
    }

    getParticipants() {
        fetch("/api/events/" + this.props.event._id + "/participants", {
            accept: "application/json"
        }).then(response => response.json())
        .then(participants => {
            this.setState({participants: participants}, () => {
                this.render();
            });
        });
    }

    renderParticipants() {
        let attending = this.state.participants.slice(0, this.props.event.maxAttending || this.state.participants.length)
        return attending.map((participant, index) => (
            <li key={index}>
            <Participant key={participant._id} participant={participant} />
            </li>
        ));
    }

    renderQueue() {
        let max = this.props.event.maxAttending || this.state.participants.length;
        let queue = this.state.participants.slice(max);
        return queue.map((participant, index) => (
            <li key={index + max}>
            <Participant key={participant._id} participant={participant} />
            </li>
        ));
    }

    render() {
        return (
            <div className="participantList">
            <Registration questions={this.props.event.questions} eventID={this.props.event._id} update={this.getParticipants} />
            <h4>Osallistujat</h4>
            <ol>
            {this.renderParticipants()}
            </ol>
            {this.props.event.maxAttending && this.state.participants.length > this.props.event.maxAttending ?
                <div>
                <h4>Jonossa</h4>
                <ol>
                    {this.renderQueue()}
                </ol>
                </div>
                :
                ""
            }
            </div>
        );
    }
}

export default ParticipantList;
