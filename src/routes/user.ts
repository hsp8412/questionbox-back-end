import { Request, Response } from "express";
import express from "express";
import bcrypt from "bcryptjs";
import { validateSignUp, User } from "../models/User";
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { error } = validateSignUp(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let { username, password, email, image } = req.body;

  try {
    const userInDb = await User.findOne({ email });
    if (userInDb) return res.status(400).send("Email already exists");
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Error");
  }

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    password: passwordHash,
    email,
    image,
  });

  try {
    const result = await user.save();
    const { _id } = result;
    return res.status(200).send({ id: _id });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Error");
  }
});

module.exports = router;
