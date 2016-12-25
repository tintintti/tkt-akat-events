let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    moment = require('moment');

let participantSchema = new Schema({
    name: String,
    email: String,
    questions: [{q: String, a: String}],
    created: Date
});

participantSchema.statics.createParticipant = function (doc) {
    doc.created = moment().toDate();
    return this.create(doc).then((created) => {
        return Promise.resolve(created);
    });
};

module.exports = mongoose.model('Participant', participantSchema);
