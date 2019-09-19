import { Order } from "../models/order.js";

export const createOrder = async (req, res) => {
  try {
    const { profile } = req;
    req.body.order.user = profile;
    const order = new Order(req.body.order);
    const data = await order.save();
    res.json(data);
  } catch (error) {
    console.log("create order", error);
    res.status(500).json({ error });
  }
};
