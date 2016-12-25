import React, { Component } from 'react';
import moment from 'moment';
import ParticipantList from './ParticipantList';
import EditEvent from './EditEvent';
import '../styles/Event.css';

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {event: props.event}
        this.remove = this.remove.bind(this);
        this.registration = this.registration.bind(this);
    }

    remove() {
        console.log(this.state.event._id);
        this.props.removeEvent(this.state.event._id);
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

    updateEvent() {
        fetch('/api/events' + this.state.event._id, {
            accept: 'application/json'
        }).then(response => response.json())
        .then(event => {
            this.setState({event: event}).then(() => {
                this.render();
            })
        })
    }

    saveEvent(event) {
        fetch('/api/events/' + event._id, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event)
        }).then((msg) => {
            console.log(msg);
        }).catch(() => {
            alert('Tapahtuman päivittäminen epäonistui');
        })
    }

    registration() {
        if(this.state.event.registration)
            return (
                <section>
                <section className="registration">Ilmoittautumisaika: {this.renderDate(this.state.event.registrationStart)}
                - {this.renderDate(this.state.event.registrationEnd)}</section>
                <section className="maxAttending">Ilmoittautuneita: {this.state.event.attending.length}
                /{this.maxAttending(this.state.event.maxAttending)}</section>

                </section>
            )
        return (
            <p>Tapahtumaan ei tarvitse ilmoittautua.</p>
        )
    }

    renderParticipantList() {
        if (moment().isBetween(this.state.event.registrationStart, this.state.event.registrationEnd))
            return <ParticipantList event={this.state.event} />;
    }

    render() {
        return (
            <div className="Event">
                <button className="removeEvent" onClick={this.remove}>Poista</button>
                <h3>{this.state.event.title}</h3>
                <section className="time">Ajankohta: {this.renderDate(this.state.event.start)}</section>

                <section className="organiser">Vastuuhenkilö: {this.state.event.organiser}</section>
                <section className="location">Paikka: {this.state.event.location}</section>

                <p>{this.state.event.description}</p>

                {this.registration()}

                {this.renderParticipantList()}

                <EditEvent event={this.state.event} title="Muokkaa tapahtumaa" saveEvent={this.saveEvent}/>
            </div>
        );
    }
}

export default Event;
