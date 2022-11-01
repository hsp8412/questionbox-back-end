import mongoose from "mongoose";
import joi, { boolean, string } from "joi";
import { newQuestion } from "../interfaces/QuestionInterface";

const questionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  boxId: { type: mongoose.Schema.Types.ObjectId, ref: "Box", required: true },
  value: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const Question = mongoose.model("Question", questionSchema, "question");

export function validateQuestion(question: newQuestion) {
  const schema = joi
    .object({
      value: joi.string().max(500).min(1).required(),
      boxId: joi.string(),
    })
    .unknown(true);
  return schema.validate(question);
}
