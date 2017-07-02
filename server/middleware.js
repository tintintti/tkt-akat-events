const
    jwt = require("jsonwebtoken"),
    config = require("./config");

exports.validateAuth = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token)
        return res.sendStatus(403);

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err)
            return res.sendStatus(403);
        req.decodedToken = decoded;
        next();
    });
};

exports.checkAuth = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token)
        return next();
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err)
            return next();
        req.decodedToken = decoded;
        next();
    })
}