var cookieParser = require("cookie-parser");
var passport = require("passport");
var express = require("express");
var cors = require("cors");
var session = require("express-session");
require("dotenv").config();
var app = express();
require("./startup/database")();
require("./startup/passport")(passport);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
require("./startup/routes")(app);
var port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log("Listening at " + port);
});
module.exports = app;
//# sourceMappingURL=index.js.map