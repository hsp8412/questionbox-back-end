import { UserInterface } from "../interfaces/UserInterface";

const mongoose = require("mongoose");
const joi = require("joi");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatarUrl: {
    type: String,
    required: false,
  },
  createDate: {
    type: Date,
    require: true,
  },
});

const User = mongoose.model("User", userSchema, "user");

function validateUser(user: UserInterface) {
  const schema = joi.object({
    username: joi.string().max(50).min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    avatarUrl: joi.string(),
  });
  return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;
