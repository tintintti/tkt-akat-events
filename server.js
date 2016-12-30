let express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    router = require('./server/routes').router,
    bodyParser = require("body-parser"),
    config = require('./server/config'),
    cookieParser = require('cookie-parser');

mongoose.Promise = global.Promise;
mongoose.connect(config.database);

app.set('secret', config.jwtSecret);

app.use(cookieParser());

app.use(bodyParser.json())

app.use('/api', router);

app.listen(3001, () => {
    console.log("Listening at port 3001");
});
