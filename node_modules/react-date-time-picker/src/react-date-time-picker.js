import cx from 'classnames'
import moment from 'moment'
import React from 'react'
import Calendar from './calendar'
import Time from './time'

class DateTimePicker extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      tab: (this.props.timeOnly ? 1 : 0)
    }
  }

  handleClickTab = (tab, e) => {
    e.preventDefault()
    this.setState({tab: tab})
  };

  renderTime = (m, tab) => {
    return (
      <Time
        className={cx('tab', {'is-active': tab === 1})}
        moment={m}
        onChange={this.props.onChange}
      />
    )
  };

  renderCalendar = (m, tab) => {
    return (
      <Calendar
        className={cx('tab', {'is-active': tab === 0})}
        moment={m}
        onChange={this.props.onChange}
        prevMonthIcon={'ion-ios-arrow-left'}
        nextMonthIcon={'ion-ios-arrow-right'}
      />
    )
  };

  renderCalendarTab = (tab) => {
    return (
      <button type="button" className={cx('ion-calendar im-btn', {'is-active': tab === 0})} onClick={this.handleClickTab.bind(null, 0)}>
        Date
      </button>
    )
  };

  renderTimeTab = (tab) => {
    return (
      <button type="button" className={cx('ion-clock im-btn', {'is-active': tab === 1})} onClick={this.handleClickTab.bind(null, 1)}>
        Time
      </button>
      )
  };

  render () {
    const tab = this.state.tab
    const m = this.props.moment

    return (
      <div className="m-react-date-time-picker">
        { (this.props.timeOnly || this.props.dateOnly) &&
          <div className="options">
            { this.props.timeOnly &&
              this.renderTimeTab(tab) ||
              null
            }

            { this.props.dateOnly &&
              this.renderCalendarTab(tab) ||
              null
            }
          </div> ||
          <div className="options">
            { this.renderTimeTab(tab) }
            { this.renderCalendarTab(tab) }
          </div>
        }

        { (this.props.timeOnly || this.props.dateOnly) &&
          <div className="tabs">
            { this.props.timeOnly &&
              this.renderTime(m, tab) ||
              null
            }

            { this.props.dateOnly &&
              this.renderCalendar(m, tab) ||
              null
            }
          </div> ||
          <div className="tabs">
            { this.renderTime(m, tab) }
            { this.renderCalendar(m, tab) }
          </div>
        }
      </div>
    );
  }
};

export default DateTimePicker
