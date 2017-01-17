import EditEventBase from "./EditEventBase";
import "./AddEvent.css";
import moment from "moment";
import Auth from "../../modules/Auth";

class AddEvent extends EditEventBase {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            start: "",
            creator: Auth.getUser(),
            location: "",
            registration: true,
            registrationStart: "",
            registrationEnd: "",
            maxAttending: "",
            questions: [],
            newQuestion: "",
            className: "AddEvent"
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        let newEvent = this.state;
        newEvent.start = moment(this.state.start, "DD/MM/YYYY HH:mm").toDate();
        newEvent.registrationStart = moment(this.state.registrationStart, "DD/MM/YYYY HH:mm").toDate();
        newEvent.registrationEnd = moment(this.state.registrationEnd, "DD/MM/YYYY HH:mm").toDate();
        newEvent.creator = this.state.creator.id;

        this.props.addEvent(newEvent).then(() => {
            this.setState({
                title: "",
                description: "",
                start: "",
                creator: Auth.getUser(),
                location: "",
                registration: true,
                registrationStart: "",
                registrationEnd: "",
                maxAttending: "",
                questions: [],
                newQuestion: ""
            });
        }).catch(() => {
            alert("Tapahtuman luominen epäonnistui.");
        });
    }

    cancel(event) {
        event.preventDefault();
        this.setState({
            title: "",
            description: "",
            start: "",
            creator: Auth.getUser(),
            location: "",
            registration: true,
            registrationStart: "",
            registrationEnd: "",
            maxAttending: "",
            questions: [],
            newQuestion: ""
        });
    }
}

export default AddEvent;
