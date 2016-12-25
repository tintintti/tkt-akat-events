let express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    router = require('./server/routes').router;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/akat');

app.use('/api', router);

app.listen(3001, () => {
    console.log("Listening at port 3001");
});
