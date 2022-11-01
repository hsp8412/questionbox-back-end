import express from "express";
import { auth } from "../middleware/auth";
import { Question } from "../models/Question";
import { Answer, validateAnswer } from "../models/Answer";
import { Box, validateBox } from "../models/Box";

const router = express.Router();

//Get answer by question id
router.get("/:questionId", auth, async (req: any, res: any) => {
  const questionId = req.params.questionId;

  let question;
  try {
    question = Question.findOne({ _id: questionId });
  } catch (err) {
    return res.send(500).send(err.message);
  }
  if (!question) {
    return res.send(400).send("Invalid question id");
  }

  let answer;
  try {
    answer = Answer.findOne({ questionId });
  } catch (err) {
    return res.send(500).send(err.message);
  }
  return res.status(200).send(answer);
});

//Post new answer
router.post("/", auth, async (req: any, res: any) => {
  const userId = req.user._id;

  const { error } = validateAnswer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { value, questionId } = req.body;

  let question;
  try {
    question = await Question.findOne({ _id: questionId });
  } catch (e) {
    return res.status(500).send(e.message);
  }
  if (!question) {
    return res.status(400).send("Invalid question id.");
  }

  const { boxId } = question;

  let box;
  try {
    box = await Box.findOne({ _id: boxId, userId });
  } catch (e) {
    return res.status(500).send(e.message);
  }
  if (!box) {
    return res
      .status(400)
      .send("You can only write answers to questions in your own boxes.");
  }

  const newAnswer = new Answer({ value, questionId });

  try {
    await newAnswer.save();
    return res.status(200).send(newAnswer);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
