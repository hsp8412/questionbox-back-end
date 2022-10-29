const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { validateUser, User } = require("../models/User");

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let { username, password, email, avatarUrl } = req.body;

  try {
    const userInDb = await User.findOne({ email: req.body.email });
    if (userInDb) return res.status(400).send("Email already exists");
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Error");
  }

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    password: passwordHash,
    email,
    avatarUrl,
    createDate: new Date(),
  });

  try {
    const result = await user.save();
    const { _id } = result;
    res.status(200).send({ id: _id });
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Error");
  }
});

module.exports = router;
