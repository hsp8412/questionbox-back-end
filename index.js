var cookieParser = require("cookie-parser");
var passport = require("passport");
var express = require("express");
var cors = require("cors");
var session = require("express-session");
require("dotenv").config();
var app = express();
require("./startup/database")();
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
require("./startup/passport");
require("./startup/routes")(app);
var port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log("Listening at " + port);
});
module.exports = app;
//# sourceMappingURL=index.js.map