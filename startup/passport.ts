import {
  DatabaseUserInterface,
  UserInterface,
} from "../interfaces/UserInterface";
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
try {
  passport.use(
    new LocalStrategy(async (email: string, password: string, done) => {
      try {
        const user: UserInterface = await User.findOne({
          email: email,
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
    })
  );

  passport.serializeUser((user: DatabaseUserInterface, cb) => {
    cb(null, user._id);
  });

  passport.deserializeUser(async (id: string, cb) => {
    try {
      await User.findOne({ _id: id }, (err: Error, user: UserInterface) => {
        const userInformation: DatabaseUserInterface = {
          username: user.username,
          email: user.email,
          _id: user._id,
          avatarUrl: user.avatarUrl,
        };
        cb(err, userInformation);
      });
    } catch (e) {
      throw e;
    }
  });
} catch (e) {
  throw e;
}
