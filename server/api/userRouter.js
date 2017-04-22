let express = require("express"),
    router  = express.Router(),
    Event = require("../models/Event"),
    validateAuth = require("../middleware").validateAuth;

router.get("/users/:id/events", validateAuth, (req, res) => {
    Event.find({creator: req.decodedToken.user.id})
        .populate({path: "creator", select: "name _id"})
        .populate("attending")
        .sort({start: "asc"})
        .then(events => {
            console.log(events);
            res.json(events);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
});

exports.router = router;
