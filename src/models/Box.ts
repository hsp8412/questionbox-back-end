import mongoose from "mongoose";
import joi, { bool, boolean, string } from "joi";
import { newBox } from "../interfaces/BoxInterface";

const boxSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  boxName: { type: String, required: true },
  visible: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const Box = mongoose.model("Box", boxSchema, "box");

export function validateBox(box: newBox) {
  const schema = joi
    .object({
      boxName: joi.string().max(100).min(1).required(),
    })
    .unknown(true);
  return schema.validate(box);
}
