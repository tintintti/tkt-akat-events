import React, { Component } from "react";
import Event from "./Event";
import AddEvent from "./AddEvent";
import "../styles/EventList.css";
import Auth from "../modules/Auth";
import Login from "./Login";
import Logout from "./Logout";
import SignUp from "./SignUp";

class EventList extends Component {
    constructor(props) {
        super(props);
        this.state = {events: [], past: false};
        this.getEvents = this.getEvents.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
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

    showPast() {
        this.getEvents({past: true});
    }

    renderEvents() {
        return this.state.events.map(event => (
            <Event
            key={event._id}
            event={event}
            removeEvent={this.removeEvent}
            />
        ));
    }

    render() {
        return (
            <div className="EventList">
            <h2>Tapahtumat</h2>
            {Auth.isAuthenticated() ? (
                <div>
                <Logout update={this.getEvents} />
                <AddEvent addEvent={this.addEvent} title="Lisää tapahtuma" cName="AddEvent" />
                </div>
            ) : (
                <div className="LoginSign">
                    <Login update={this.getEvents} /><br/>
                    <SignUp update={this.getEvents} />
                </div>)}

            <div className="Events">
            <button onClick={this.getEvents}>Tulevat tapahtumat</button>
            <button onClick={this.showPast}>Menneet tapahtumat</button>
            {this.renderEvents()}
            </div>
            </div>
        );
    }
}

export default EventList;
