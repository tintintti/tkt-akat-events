let express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    events = require("./api/eventRouter").router,
    auth = require("./api/authRouter").router;

router.all("*", bodyParser.json());
router.use([events, auth]);

exports.router = router;
