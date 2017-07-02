let mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    moment = require("moment"),
    Participant = require("./Participant");

let eventSchema = new Schema({
    title: {required: true, type: String},
    description: {required: true, type: String},
    start: {required: true, type: Date},
    location: String,
    registration: Boolean,
    registrationStart: Date,
    registrationEnd: Date,
    creator: {required: true, type: Schema.Types.ObjectId, ref:"User"},
    attending: [{type: Schema.Types.ObjectId, ref: "Participant"}],
    maxAttending: Number,
    questions: [String],
    eventType: {type: String, default: ""}
});


eventSchema.statics.getEvent = function(params) {
    return this.findOne(params)
        .populate({path: "creator", select: "name email id"})
        .exec()
        .then(event => {
            return Promise.resolve(event);
        });
};

eventSchema.statics.getEvents = function (params) {
    let today = moment().startOf("day").toDate();
    let query = this.find().where("start");
    if (params.past)
        query = query.lt(today).sort({start: "desc"});
    else
        query = query.gte(today).sort({start: "asc"});

    return query.populate({path: "creator", select:"name id"}).exec().then((events) => {
        return Promise.resolve(events);
    }).catch((err) => {
        console.log(err);
        return Promise.reject(err);
    });
};

eventSchema.statics.addEvent = function (doc) {
    console.log(doc)
    return this.create(doc).then(event => {
        return Promise.resolve(event);
    }).catch((err) => {
        console.log(err);
        return Promise.reject("Error creating event.");
    });
};

eventSchema.statics.removeEvent = function (eventID) {
    return this.remove({_id: eventID}).then((data) => {
        return Promise.resolve(data);
    }).catch(() => {
        return Promise.reject();
    });
};

eventSchema.statics.updateEvent = function (id, doc) {
    return this.findOneAndUpdate({_id: id}, doc.event, {new: true}).exec().then((event) => {
        return Promise.resolve(event);
    }).catch((err) => {
        console.log(err);
        return Promise.reject();
    });
};

eventSchema.statics.addPatricipant = function (eventId, doc) {
    if (doc.email === undefined || !/^[^@]+@[^@]+$/.test(doc.email))
        return Promise.reject("Invalid email address.");

    let e;
    return this.findOne({_id: eventId}).then((event) => {
        if (!moment().isBetween(event.registrationStart, event.registrationEnd))
            return Promise.reject();
        e = event;
        return Participant.createParticipant(doc)
    }).then((participant) => {
        e.attending.push(participant._id);
        return e.save();
    }).then((event) => {
        return Promise.resolve(event);
    }).catch((err) => {
        return Promise.reject("Adding failed");
    });
};

eventSchema.statics.getParticipants = function (params) {
    let select = "name";
    if (params.auth)
        select = "name email questions";
    return this.findOne({_id: params.eventID}).populate({
            path: "attending",
            options: {sort: {created: "asc"},
            select: select}
    }).exec().then((event) => {
        return Promise.resolve(event.attending);
    }).catch(() => {
        return Promise.reject();
    });
};

eventSchema.statics.removePatricipant = function (eventId, id) {
    return this.findOne({_id: eventId}).then((event) => {
        if (event === null)
            return Promise.reject("No such event");
        let attending = event.attending.filter((participant) => {
            return participant.toString() !== id;
        });
        return event.update({attending: attending}).exec()
    }).then((event) => {
        return Promise.resolve(event);
    }).catch((err) => {
        return Promise.reject("Removing participant failed.");
    });
};

module.exports = mongoose.model("Event", eventSchema);
