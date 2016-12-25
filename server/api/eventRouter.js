let express = require('express'),
    router  = express.Router(),
    bodyParser = require("body-parser"),
    Event = require('../models/Event');


router.use(bodyParser.json());

router.post('/events', (req, res) => {
    Event.addEvent(req.body.event).then((data) => {
        res.json(data);
    }).catch(() => {
        res.sendStatus(500);
    });
});

router.get('/events', (req, res) => {
    let past = req.query.past || false;

    Event.getEvents({past: past}).then((events) => {
        res.json(events);
    }).catch(() => {
        res.sendStatus(500);
    })
});

router.post('/events/:id/participants', (req, res) => {
    Event.addPatricipant(req.params.id, req.body).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.sendStatus(500);
    })
});

router.get('/events/:id/participants', (req, res) => {
    Event.getParticipants(req.params.id).then(participants => {
        res.json(participants);
    }).catch(() => {
        res.sendStatus(500)
    });
});

router.delete('/events/:id/participants/:pid', (req, res) => {
    Event.removePatricipant(req.params.id, req.params.pid).then(event => {
        console.log('jee', event);
        res.json(event)
    }).catch(err => {
        console.log("kakka", err);
        res.sendStatus(500);
    })
});

router.delete('/events/:id', (req, res) => {
    Event.removeEvent(req.params.id).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.sendStatus(500);
    });
})

exports.router = router;
