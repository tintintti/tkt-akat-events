require("dotenv").config();

let express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    router = require("./server/routes").router,
    bodyParser = require("body-parser"),
    config = require("./server/config"),
    helmet = require("helmet");

mongoose.Promise = global.Promise;
mongoose.connect(config.database);

app.use(helmet());

app.set("secret", config.jwtSecret);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(bodyParser.json())

app.use("/api", router);

app.set("port", (process.env.PORT || 3001));

app.listen(app.get("port"), () => {
    console.log("Listening at port 3001");
});
