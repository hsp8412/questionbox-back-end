"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cors = require("cors");
var express = require("express");
var userRoute = require("../routes/user");
module.exports = function (app) {
    app.use(express.json());
    app.use(cors({ origin: "http://localhost:3000", credentials: true }));
    app.use("/api/user", userRoute);
};
//# sourceMappingURL=routes.js.map