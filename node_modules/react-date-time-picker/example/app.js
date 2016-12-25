import '../src/less/react-date-time-picker.less'
import './app.less'

import moment from 'moment'
import React from 'react'
import ReactDOM from 'react-dom'
import InputMoment from '../src/react-date-time-picker'
import packageJson from '../package.json'

class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      m: moment()
    }
  };

  handleChange = (m) => {
    this.setState({m: m})
  };

  render () {
    return (
      <div className="app">
        <h1>{packageJson.name}</h1>
        <h2>{packageJson.description}</h2>
        <form>
        <div className="input">
          <input
            type="text"
            value={this.state.m.format('llll')}
            readOnly
          />
        </div>
        <InputMoment
          moment={this.state.m}
          onChange={this.handleChange}
        />
        </form>
      </div>
    );
  };
};

ReactDOM.render(<App/>, document.getElementById('app'));
