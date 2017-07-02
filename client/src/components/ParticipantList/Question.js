import React, { Component } from 'react';

class Question extends Component {
    render() {
        return (
            <li>
                Q: {this.props.question.q}<br/>
                A: {this.props.question.a}
            </li>
        )
    }
}

export default Question;