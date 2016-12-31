const
    mongoose = require("mongoose"),
    DB_URI = 'mongodb://localhost/akat-test';

require('mocha-mongoose')(DB_URI);
mongoose.Promise = global.Promise;

before(function (done) {
    mongoose.connect(DB_URI, done);
});
