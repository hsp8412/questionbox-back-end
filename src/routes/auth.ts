import passport from "passport";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
const router = express.Router();
dotenv.config();

router.post(
  "/login",
  passport.authenticate("local"),
  (req: Request, res: Response) => {
    res.status(200).send("success");
  }
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.CLIENT_URL,
    session: true,
  }),
  function (req, res) {
    res.redirect(process.env.CLIENT_URL || "/");
  }
);

router.post("/logout", function (req, res, next) {
  req.logout({ keepSessionInfo: false }, function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.CLIENT_URL || "/");
  });
});

module.exports = router;
