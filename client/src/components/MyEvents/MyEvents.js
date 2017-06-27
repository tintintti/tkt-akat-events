import React, { Component } from "react";
import Event from "../Event/Event";
import AddEvent from "../Event/AddEvent";
import Auth from "../../modules/Auth";

import "./MyEvents.css";

class MyEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {events: []};
        this.getEvents = this.getEvents.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
        this.getEvents();
    }
    getEvents() {
        let user = Auth.getUser();
        fetch("/api/users/" + user.id + "/events", {
            headers: {
                "Accept": "application/json",
                "x-access-token": Auth.getToken()
            }
        }).then(response => response.json())
        .then(events => {
            console.log(events);
            this.setState({events: events}, () => {
                this.render();
            });
        }).catch(err => {
            console.error(err);
        });
    }

    addEvent(newEvent) {
        let body = {event: newEvent, token: Auth.getToken()}
        console.log("add", body);
        return fetch("/api/events", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        }).then((response) => {
            if (response.status === 500)
                return Promise.reject();
            this.getEvents();
            return Promise.resolve();
        }).catch(() => {
            return Promise.reject();
        });
    }

    removeEvent(eventID) {
        fetch("/api/events/" + eventID, {
            method: "delete",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "x-access-token": Auth.getToken()
            }
        }).then((msg) => {
            this.getEvents();
        }).catch((err) => {
            console.error(err);
        })
    }

    renderEvents() {
        return this.state.events.map(event => (
            <Event
                key={event._id}
                event={event}
                creator={Auth.getUser().id}
                removeEvent={this.removeEvent}
            />
        ));
    }

    render() {
        return (
            <div className="OwnEvents">
            <h2>Omat tapahtumat</h2>
                <AddEvent
                    title="Lisää tapahtuma"
                    addEvent={this.addEvent}
                />
                <div className="OwnEventList">
                { this.state.events.length > 0 ? this.renderEvents() : <div className="noEvents"><p>Ei tapahtumia.</p></div> }
                </div>
            </div>
        )
    }
}

export default MyEvents;
