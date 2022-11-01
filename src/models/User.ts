import { UserInterface } from "../interfaces/UserInterface";
import mongoose from "mongoose";
import joi from "joi";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "",
  },
  email: { type: String, required: true, unique: true },
  email_verified: { type: Boolean, default: false },
  verify_token: { type: String, default: null },
  provider: { type: String, default: "email" },
  provider_id: { type: String, default: null },
  password: { type: String, required: true },
  password_reset_token: { type: String, default: null },
  image: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema, "user");

export function validateSignUp(user: UserInterface) {
  const schema = joi
    .object({
      username: joi.string().max(50).min(1).required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
      image: joi.string(),
    })
    .unknown(true);
  return schema.validate(user);
}
