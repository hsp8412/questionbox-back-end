"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cors = require("cors");
var express = require("express");
var userRoute = require("../routes/user");
var authRoute = require("../routes/auth");
var boxRoute = require("../routes/box");
module.exports = function (app) {
    app.get("/", function (req, res, next) {
        res.status(200).send("Hi, It works!");
    });
    app.use(express.json());
    app.use(cors({ origin: "http://localhost:3000", credentials: true }));
    app.use("/api/user", userRoute);
    app.use("/api/auth", authRoute);
    app.use("/api/box", boxRoute);
};
//# sourceMappingURL=routes.js.map