import cors = require("cors");
import express = require("express");
import { Application } from "express";
const userRoute = require("../routes/user");
const authRoute = require("../routes/auth");
const boxRoute = require("../routes/box");

module.exports = function (app: Application) {
  app.use(express.json());
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use("/api/user", userRoute);
  app.use("/api/auth", authRoute);
  app.use("/api/box", boxRoute);
};
