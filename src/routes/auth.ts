import passport from "passport";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
const router = express.Router();
dotenv.config();

router.get("/login/success", (req: Request, res: Response) => {
  if (req.user) {
    return res.status(200).send({
      success: true,
      message: "User authenticated.",
      user: req.user,
    });
  } else {
    return res.status(403);
  }
});

router.post(
  "/login",
  passport.authenticate("local"),
  (req: Request, res: Response) => {
    res.status(200).send(req.user);
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

router.delete("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    console.log("logout");
    res.redirect(process.env.CLIENT_URL || "/");
  });
});

module.exports = router;
