const cookieParser = require("cookie-parser");
const passport = require("passport");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();

const app = express();
require("./startup/database")();
require("./startup/passport")(passport);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
  })
);

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./startup/routes")(app);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Listening at " + port);
});

module.exports = app;
