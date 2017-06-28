import React from "react";
import Event from "./Event";
let classnames = require('classnames');

class EventStub extends Event {
    constructor(props){
        super(props);
        this.shortenDescription = this.shortenDescription.bind(this);
    }

    shortenDescription() {
        const descLength = 140;
        if (this.state.event.description.length < descLength)
            return this.state.event.description;
        return this.state.event.description.substr(0, descLength)+"...";
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
                    <h3>{this.state.event.title}</h3>
                    <h4>{this.renderDate(this.state.event.start)}</h4>
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