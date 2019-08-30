import formidable from "formidable";
import fs from "fs";
import _ from "lodash";
import { Product } from "../models/product.js";
import { validator } from "../helpers/validator/index.js";

export const createProduct = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }
    const isValid = validator.formDataValidation({
      ...fields,
      ...files
    });
    if (!isValid) {
      return res.status(400).json({
        error: "All fields ar required"
      });
    }
    const product = new Product(fields);
    if (files.photo) {
      if (files.photo.size > 500000) {
        return res.status(400).json({
          error: "Image should be less than 500 kb in size"
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    try {
      const result = await product.save();
      res.json({ result });
    } catch (error) {
      res.status(400).json({ error });
    }
  });
};

export const productById = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id);
    if (!product) throw new Error();
    req.product = product;
    next();
  } catch (error) {
    return res.status(404).json({
      error: "Product not found"
    });
  }
};

export const readProduct = (req, res) => {
  req.product.photo = undefined;
  res.json(req.product);
};

export const deleteProduct = async (req, res) => {
  const product = req.product;
  try {
    const deletedProduct = await product.remove();
    if (!deletedProduct) throw new Error();
    res.json({
      message: "Product deleted succesfully"
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Product not found"
    });
  }
};

export const updateProduct = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }
    const isValid = validator.formDataValidation({
      ...fields,
      ...files
    });
    if (!isValid) {
      return res.status(400).json({
        error: "All fields ar required"
      });
    }
    let product = req.product;
    product = _.extend(product, fields);
    if (files.photo) {
      if (files.photo.size > 500000) {
        return res.status(400).json({
          error: "Image should be less than 500 kb in size"
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    try {
      const result = await product.save();
      res.json({ result });
    } catch (error) {
      res.status(400).json({ error });
    }
  });
};

export const productsList = async (req, res) => {
  const order = req.query.order ? req.query.order : "asc";
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  const limit = req.query.limit ? parseInt(req.query.limit) : 6;

  try {
    const products = await Product.find({})
      .select("-photo")
      .populate("categoty")
      .sort([[sortBy, order]])
      .limit(limit);

    res.send(products);
  } catch (error) {
    res.status(400).json({ error: "Products not found" });
  }
};
