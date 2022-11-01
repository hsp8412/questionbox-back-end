import mongoose from "mongoose";
import joi from "joi";
import { newAnswer } from "../interfaces/AnswerInterface";

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  value: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const Answer = mongoose.model("Answer", answerSchema, "answer");

export function validateAnswer(answer: newAnswer) {
  const schema = joi
    .object({
      value: joi.string().max(500).min(1).required(),
      questionId: joi.string(),
    })
    .unknown(true);
  return schema.validate(answer);
}
