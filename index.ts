const cookieParser = require("cookie-parser");
const passport = require("passport");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();

const app = express();
require("./startup/database")();
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./startup/passport");

require("./startup/routes")(app);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Listening at " + port);
});

module.exports = app;
