let express = require("express"),
    router  = express.Router(),
    User = require("../models/User"),
    jwt = require("jsonwebtoken"),
    config = require("../config");

router.post("/signup", (req, res) => {
    if (!(req.body.email && req.body.password && req.body.name))
        return res.json({success: false});
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save().then((user) => {
        res.json({success: true});
    }).catch((err) => {
        if (err.code === 11000)
            return res.status(500).json({error: "Sähköpostiosoite on jo käytössä."})
        res.status(500).json({error: "Server error"});
    })
});

router.post("/login", (req, res) => {
    User.findOne({email: req.body.email}).then((user) => {
        if (!user)
            return res.sendStatus(403);
        user.checkPassword(req.body.password).then(() => {
            let token = jwt.sign({user: {id: user._id, name: user.name}}, config.secret, {
                expiresIn: "8h"
            });
            console.log("token", token);
            res.json({success: true, token: token});
        }).catch((err) => {
            res.sendStatus(403);
        })
    })
});


exports.router = router;
