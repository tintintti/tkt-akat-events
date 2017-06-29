import React from 'react';
import Event from './Event';
import classnames from 'classnames';
import EditEvent from "./EditEvent";
import './EventFullPage.css';

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

    componentDidMount() {
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
                    <a href="/"><img className="backArrow" alt="Back to events" src="/back.png" /></a>
                </div>
                <div className="EventBody">
                    {this.props.creator && this.props.creator === this.state.event.creator._id  ? (
                        <button className="removeEvent" onClick={this.remove}>Poista</button>
                    ) : ""}

                    <h2>{this.state.event.title}</h2>
                    <section className="time">Ajankohta: {this.renderDate(this.state.event.start)}</section>

                    <section className="creator">Vastuuhenkilö: {this.state.event.creator.name}</section>
                    <section className="location">Paikka: {this.state.event.location}</section>

                    <p>{this.state.event.description}</p>

                    {this.registration()}
                    {this.renderParticipantList()}
                    {this.props.creator && this.props.creator === this.state.event.creator._id ?
                        <button onClick={this.showEditing}>Muokkaa</button>
                        : ""
                    }
                    {this.props.creator && this.props.creator === this.state.event.creator._id && this.state.editing === true ? (
                        <EditEvent event={this.state.event} title="" saveEvent={this.saveEvent} cancel={this.hideEditing} />
                    ): ""}
                </div>
            </div>
        );
    }
}

export default EventFullPage;