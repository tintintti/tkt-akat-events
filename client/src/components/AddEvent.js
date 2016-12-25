import EditEventBase from './EditEventBase';
import '../styles/AddEvent.css';
import moment from 'moment';

class AddEvent extends EditEventBase {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            start: '',
            organiser: '',
            location: '',
            registration: true,
            registrationStart: '',
            registrationEnd: '',
            maxAttending: '',
            questions: [],
            newQuestion: ''
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        let newEvent = this.state;
        newEvent.start = moment(this.state.start, "DD/MM/YYYY HH:mm").toDate();
        newEvent.registrationStart = moment(this.state.registrationStart, "DD/MM/YYYY HH:mm").toDate();
        newEvent.registrationEnd = moment(this.state.registrationEnd, "DD/MM/YYYY HH:mm").toDate();

        this.props.addEvent(newEvent).then(() => {
            this.setState({
                title: '',
                description: '',
                start: '',
                organiser: '',
                location: '',
                registration: true,
                registrationStart: '',
                registrationEnd: '',
                maxAttending: '',
                questions: [],
                newQuestion: ''
            });
        }).catch(() => {
            alert("Tapahtuman luominen epäonnistui.");
        });

    }
}

export default AddEvent;
