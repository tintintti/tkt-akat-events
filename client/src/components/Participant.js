import React, { Component } from "react";

class Participant extends Component {
    render() {
        return (
            <div className="participant">
            {this.props.participant.name}
            </div>
        )
    }
}

export default Participant;
