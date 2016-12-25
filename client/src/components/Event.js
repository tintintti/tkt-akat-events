import React, { Component } from 'react';
import moment from 'moment';
import ParticipantList from './ParticipantList';
import '../styles/Event.css';

class Event extends Component {
    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
        this.registration = this.registration.bind(this);
    }

    remove() {
        console.log(this.props.event._id);
        this.props.removeEvent(this.props.event._id);
    }

    renderDate(date) {
        if (moment(date).isValid())
            return moment(date).format("DD.MM.YYYY HH:mm");
        else
            return '';
    }

    maxAttending(max) {
        if (max > 0)
            return max;
        return '-';
    }

    registration() {
        if(this.props.event.registration)
            return (
                <section>
                <section className="registration">Ilmoittautumisaika: {this.renderDate(this.props.event.registrationStart)}
                - {this.renderDate(this.props.event.registrationEnd)}</section>
                <section className="maxAttending">Ilmoittautuneita: {this.props.event.attending.length}
                /{this.maxAttending(this.props.event.maxAttending)}</section>

                </section>
            )
        return (
            <p>Tapahtumaan ei tarvitse ilmoittautua.</p>
        )
    }

    renderParticipantList() {
        if (moment().isBetween(this.props.event.registrationStart, this.props.event.registrationEnd))
            return <ParticipantList event={this.props.event} />;
    }

    render() {
        return (
            <div className="Event">
                <button className="removeEvent" onClick={this.remove}>Poista</button>
                <h3>{this.props.event.title}</h3>
                <section className="time">Ajankohta: {this.renderDate(this.props.event.start)}</section>

                <section className="organiser">Vastuuhenkilö: {this.props.event.organiser}</section>
                <section className="location">Paikka: {this.props.event.location}</section>

                <p>{this.props.event.description}</p>

                {this.registration()}

                {this.renderParticipantList()}
            </div>
        );
    }
}

export default Event;
