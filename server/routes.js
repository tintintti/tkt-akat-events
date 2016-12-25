let express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    events = require('./api/eventRouter').router;

router.all("*", bodyParser.json());
router.use([events]);

exports.router = router;
