import React, { Component } from "react";

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {q: props.question, a: ""};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({a: event.target.value}, () => {
            this.props.add(this.state);
        });
    }

    render() {
        return (
            <div className="question">
            <label>{this.state.q} <br/><input value={this.state.a} onChange={this.handleChange} /></label>
            </div>
        )
    }
}

export default Question;
