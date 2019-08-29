import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import { User } from "../models/user.js";

export const signUp = (req, res) => {
  const { body } = req;
  const user = new User(body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({ err });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({ user });
  });
};

export const signIn = async (req, res) => {
  const {
    body: { email, password }
  } = req;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error();
    }

    if (!user.authenticate(password)) {
      res.status(401).json({ error: `Email or password don't match` });
      return;
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, email: mail, name, role } = user;
    res.json({ token, user: { _id, mail, name, role } });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "user not exist" });
  }
};

export const signOut = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Sign out success" });
};

