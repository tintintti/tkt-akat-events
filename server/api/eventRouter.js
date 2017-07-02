let express = require("express"),
    router  = express.Router(),
    Event = require("../models/Event"),
    middleware = require("../middleware")
    validateAuth = middleware.validateAuth,
    checkAuth = middleware.checkAuth;

router.post("/events", validateAuth, (req, res) => {
    Event.addEvent(req.body.event).then((data) => {
        res.json(data);
    }).catch(() => {
        res.sendStatus(500);
    });
});

router.get("/events", (req, res) => {
    let past = req.query.past || false;
    Event.getEvents({past: past}).then((events) => {
        res.json(events);
    }).catch(() => {
        res.sendStatus(500);
    })
});

router.post("/events/:id/participants", (req, res) => {
    Event.addPatricipant(req.params.id, req.body).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.sendStatus(500);
    })
});

router.get("/events/:id/participants", checkAuth, (req, res) => {
    Event.getParticipants({eventID: req.params.id, auth: req.decodedToken}).then(participants => {
        res.json(participants);
    }).catch((err) => {
        res.sendStatus(500)
    });
});

router.delete("/events/:id/participants/:pid", (req, res) => {
    Event.removePatricipant(req.params.id, req.params.pid).then(event => {
        res.json(event)
    }).catch(err => {
        res.sendStatus(500);
    })
});

router.put("/events/:id", validateAuth, (req, res) => {
    Event.findOne({_id: req.params.id}).exec().then((event) => {
        if (event.creator.toString() !== req.decodedToken.user.id)
            return res.sendStatus(403);
        return Event.updateEvent(req.params.id, req.body);
    }).then((event) => {
        console.log("event updated", event);
        res.json(event);
    }).catch(() => {
        res.sendStatus(500);
    })
});

router.get("/events/:id", (req, res) => {
    Event.getEvent({_id: req.params.id}).then((event) => {
        if (event === null)
            return res.sendStatus(404);
        res.json(event);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
});

router.delete("/events/:id", validateAuth, (req, res) => {
    Event.findOne({_id: req.params.id}).exec().then(event => {
        if (req.decodedToken.user.id !== event.creator.toString())
            return Promise.reject({status: 403});
        return Event.removeEvent(req.params.id);
    }).then((data) => {
        res.json(data);
    }).catch((err) => {
        if (err.status)
            return res.sendStatus(err.status);
        res.sendStatus(500);
    });
})

exports.router = router;
