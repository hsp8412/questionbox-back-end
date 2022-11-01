import express from "express";
import { auth } from "../middleware/auth";
import { User } from "../models/User";
import { Box, validateBox } from "../models/Box";
const router = express.Router();

//Get boxes of current user
router.get("/", auth, async (req: any, res) => {
  const id = req.user._id;
  let boxes;
  try {
    boxes = await User.find({ userId: id, visible: true });
  } catch (e) {
    res.status(500).send("Internal Error");
  }
  return res.status(200).send(boxes);
});

//Get boxes by userId
router.get("/:userId", auth, async (req: any, res) => {
  const userId = req.params.UserId;
  let boxes;
  try {
    boxes = await User.find({ userId, visible: true });
  } catch (e) {
    res.status(500).send("Internal Error");
  }
  return res.status(200).send(boxes);
});

router.post("/", auth, async (req: any, res: any) => {
  const { error } = validateBox(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userId = req.user._id;
  const { boxName } = req.body;
  const newBox = new Box({ boxName, userId });
  try {
    const result = await newBox.save();
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send("Internal Error");
  }
});

module.exports = router;
