import { User } from "../models/user.js";

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
