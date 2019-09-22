import { User } from "../models/user.js";
import { Order } from "../models/order.js";

export const findUserbyID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    user.salt = undefined;
    user.hashed_password = undefined;
    if (!user) {
      throw new Error();
    }
    req.profile = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "User not found" });
  }
};

export const getUser = (req, res) => {
  res.json(req.profile);
};

export const updateUser = async (req, res) => {
  const {
    profile: { _id },
    body
  } = req;
  try {
    const user = await User.findByIdAndUpdate(
      _id,
      {
        $set: body
      },
      { new: true, useFindAndModify: false }
    );
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "User not found" });
  }
};

export const purchaseHistory = async (req, res) => {
  const {
    profile: { _id }
  } = req;
  try {
    const orders = await Order.find({ user: _id })
      .populate("user", "_id name")
      .sort("-created");
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: "User not found" });
  }
};
