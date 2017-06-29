import React from "react";
import Event from "./Event";
let classnames = require('classnames');

class EventStub extends Event {
    constructor(props){
        super(props);
        this.state = {
            event: props.event,
            editing: false
        };
        this.shortenDescription = this.shortenDescription.bind(this);
        this.eventUrl = this.eventUrl.bind(this);
    }

    shortenDescription() {
        const descLength = 140;
        if (this.state.event.description.length < descLength)
            return this.state.event.description;
        return this.state.event.description.substr(0, descLength)+"...";
    }

    componentDidMount() {}

    eventUrl() {
        return "#/event/" + this.state.event._id;
    }

    render() {
        let headerClasses = classnames({
            "EventHeader": true,
            'defaultImg': !this.state.event.eventType,
            [this.state.event.eventType]: this.state.event.eventType
        });
        return (
            <div className="Event">
                <div className={headerClasses} />
                <div className="EventBody">
                    <a href={this.eventUrl()}> <h2>{this.state.event.title}</h2></a>
                    <h3>{this.renderDate(this.state.event.start)}</h3>
                    <section className="creator">Vastuuhenkilö: {this.state.event.creator.name}</section>
                    <section className="location">Paikka: {this.state.event.location}</section>
                    <p>{this.shortenDescription()}</p>
                    {this.registration()}
                </div>
            </div>
        );
    }
}

export default EventStub;