import {
  NewUserInterface,
  UserInfoInterface,
  UserInterface,
} from "../interfaces/UserInterface";
import { Profile } from "passport-google-oauth20";
import dotenv from "dotenv";
import { deserializeUser } from "passport";
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
dotenv.config();

module.exports = function (passport: any) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email: string, password: string, done: Function) => {
        console.log("in");
        try {
          const user: UserInterface = await User.findOne({
            email: email,
            provider: "email",
          });
          if (!user) {
            return done(null, false);
          }
          const validLogin = await bcrypt.compare(password, user.password);
          if (!validLogin) {
            return done(null, false);
          }
          return done(null, user);
        } catch (err) {
          throw err;
        }
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
      async function (
        accessToken: any,
        refreshToken: any,
        profile: Profile,
        done: any
      ) {
        let user;
        try {
          user = await User.findOne({
            provider_id: profile.id,
            provider: "google",
          });
        } catch (e) {
          return done(e, null);
        }
        console.log(user);
        if (user) {
          return done(null, user);
        }
        const emails = profile.emails;
        if (!emails) {
          return done(new Error("No valid email."), null);
        }
        let randomString = Math.random().toString(36).substring(2);
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(randomString, salt);
        const newUser = new User({
          username: profile.displayName,
          email: emails[0].value,
          email_verified: true,
          password: passwordHash,
          image: profile._json.picture,
          provider: "google",
          provider_id: profile.id,
        });
        try {
          await newUser.save();
        } catch (e) {
          return done(e, null);
        }
        return done(null, newUser);
      }
    )
  );

  passport.serializeUser((user: UserInfoInterface, cb: Function) => {
    cb(null, user._id.toString());
  });

  passport.deserializeUser(async (id: string, cb: Function) => {
    let user;
    try {
      user = await User.findOne({ _id: id });
    } catch (e) {
      cb(e, null);
    }
    const userInformation: UserInfoInterface = {
      username: user.username,
      email: user.email,
      _id: user._id,
      image: user.image,
    };
    cb(null, userInformation);
  });
};
