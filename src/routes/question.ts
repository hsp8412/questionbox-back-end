import express from "express";
import { auth } from "../middleware/auth";
import { Box } from "../models/Box";
import { Question, validateQuestion } from "../models/Question";

const router = express.Router();

//Get questions by box id
router.get("/:boxId", auth, async (req, res) => {
  const boxId = req.params.boxId;
  let box;
  try {
    box = await Box.findOne({ _id: boxId });
  } catch (e) {
    return res.status(500).send(e.message);
  }
  if (!box) {
    return res.status(400).send("Invalid box id.");
  }
  let questions;
  try {
    questions = await Question.find({ boxId }).select("-userId");
  } catch (e) {
    return res.status(500).send(e.message);
  }
  return res.status(200).send(questions);
});

router.post("/", auth, async (req: any, res: any) => {
  const { error } = validateQuestion(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { boxId, value } = req.body;
  const userId = req.user._id;

  let box;
  try {
    box = await Box.findOne({ _id: boxId });
  } catch (err) {
    return res.status(500).send(err.message);
  }
  if (!box) {
    return res.status(400).send("Box does not exist.");
  }

  const newQuestion = new Question({ boxId, value, userId });

  try {
    await newQuestion.save();
    return res.status(200).send(newQuestion);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
