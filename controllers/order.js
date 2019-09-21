import { Order } from "../models/order.js";
import { User } from "../models/user.js";
import { Product } from "../models/product.js";
import { RSA_NO_PADDING } from "constants";

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

export const pushHistory = async (req, res, next) => {
  try {
    const {
      body: {
        order: { products, amount, transaction_id }
      }
    } = req;
    const history = products.map(
      ({ _id, name, description, category, count: quantity }) => ({
        _id,
        name,
        description,
        category,
        quantity,
        transaction_id,
        amount
      })
    );
    await User.findByIdAndUpdate(
      req.profile._id,
      { $push: { history } },
      { new: true }
    );
    next();
  } catch (error) {
    console.log("push history", error);
    res.status(500), json({ error: "Could not update order" });
  }
};

export const decreaseQuantity = async (req, res, next) => {
  const {
    body: {
      order: { products }
    }
  } = req;

  const bulkOpts = products.map(({ _id, count }) => ({
    updateOne: {
      filter: { _id },
      update: { $inc: { quantity: -count, sold: +count } }
    }
  }));
  try {
    await Product.bulkWrite(bulkOpts, {});
    next();
  } catch (error) {
    console.log("decreaseQuantity", error);
    res.status(500), json({ error: "Could not update order" });
  }
};

export const listOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "_id name address")
      .sort("-created");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error });
  }
};
