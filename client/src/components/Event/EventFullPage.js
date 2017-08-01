import React from 'react';
import Event from './Event';
import classnames from 'classnames';
import EditEvent from "./EditEvent";
import './EventFullPage.css';
import Auth from '../../modules/Auth';

class EventFullPage extends Event {
    constructor(props) {
        super(props);
        this.state = {
            event: {
                _id: "",
                title: "",
                description: "",
                start: "",
                location: "",
                registration: "",
                registrationStart: "",
                registrationEnd: "",
                creator: "",
                attending: "",
                maxAttending: "",
                questions: "",
                eventType: ""
            },
            editing: false
        };
    }

    remove() {
        fetch("/api/events/" + this.state.event._id, {
            method: "delete",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "x-access-token": Auth.getToken()
            }
        }).then((msg) => {
            this.props.router.replace("/myevents");
        }).catch((err) => {
            console.error(err);
        })
    }

    componentWillMount() {
        fetch("/api/events/" + this.props.params.id, {
            accept: "application/json"
        }).then(response => response.json())
            .then(event => {
                console.log("event:", event);
                this.setState({event: event});
            }).catch((err) => {
            console.error(err);
            alert("Tapahtuman hakeminen epäonnistui");
        })
    }

    render() {
        let headerClasses = classnames({
            "EventHeader": true,
            'defaultImg': !this.state.event.eventType,
            [this.state.event.eventType]: this.state.event.eventType
        });
        return (
            <div className="EventFullPage">
                <div className={headerClasses}>
                    <a href="/"><img className="backArrow" alt="Back" src="/back.png" /></a>
                </div>
                <div className="EventBody">
                    {Auth.getUser() && Auth.getUser().id === this.state.event.creator._id ? (
                        <button className="removeEvent" onClick={this.remove.bind(this)}>Poista</button>
                    ) : ""}

                    <h2>{this.state.event.title}</h2>
                    <section className="time">Ajankohta: {this.renderDate(this.state.event.start)}</section>

                    <section className="creator">
                        Vastuuhenkilö: {this.state.event.creator.name}
                        &ensp;({this.state.event.creator.email})

                    </section>
                    <section className="location">Paikka: {this.state.event.location}</section>

                    <p>{this.state.event.description.split('\n').map((item, key) => {
                        return <span key={key}>{item}<br/></span>
                    })}</p>

                    {this.registration()}
                    {this.renderParticipantList()}
                    {Auth.getUser() && Auth.getUser().id === this.state.event.creator._id ?
                        <button onClick={this.showEditing}>Muokkaa</button>
                        : ""
                    }
                    {Auth.getUser() && Auth.getUser().id === this.state.event.creator._id && this.state.editing ? (
                        <EditEvent event={this.state.event} title="" saveEvent={this.saveEvent} cancel={this.hideEditing} />
                    ): ""}
                </div>
            </div>
        );
    }
}

export default EventFullPage;