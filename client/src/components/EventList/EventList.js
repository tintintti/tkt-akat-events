import React, { Component } from "react";
import EventStub from "../Event/EventStub";
import "./EventList.css";

class EventList extends Component {
    constructor(props) {
        super(props);
        this.state = {events: [], past: false};
        this.getEvents = this.getEvents.bind(this);
        this.showPast = this.showPast.bind(this);
        this.getEvents();
    }

    getEvents(params) {
        let query = "";
        if (params)
        query = params.past ? "?past=true" : "";
        fetch("/api/events" + query, {
            accept: "application/json"
        }).then(response => response.json())
        .then(events => {
            this.setState({events: events}, () => {
                this.render();
            });
        }).catch(err => {
            console.error(err);
        });
    }

    showPast() {
        this.getEvents({past: true});
    }

    renderEvents() {
        return this.state.events.map(event => (
            <EventStub
            key={event._id}
            event={event}
            removeEvent={this.removeEvent}
            />
        ));
    }

    render() {
        return (
            <div className="EventList">
            <div className="Events">
            { this.state.events.length > 0 ? this.renderEvents() : <div className="noEvents"><p>Ei tapahtumia.</p></div> }
            </div>
            </div>
        );
    }
}

export default EventList;
