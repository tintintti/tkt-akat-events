let express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    events = require("./api/eventRouter").router,
    auth = require("./api/authRouter").router,
    users = require("./api/userRouter").router;

router.all("*", bodyParser.json());
router.use([events, auth, users]);

exports.router = router;
