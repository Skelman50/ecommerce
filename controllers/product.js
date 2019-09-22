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

export const listSearch = async (req, res) => {
  const {
    query: { search, category }
  } = req;
  try {
    const query = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
      if (category && category !== "All") {
        query.category = category;
      }
      const products = await Product.find(query).select("-photo");
      res.json(products);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const productById = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id).populate("category");
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
    const products = await Product.find()
      .select("-photo")
      .populate("categoty")
      .sort([[sortBy, order]])
      .limit(limit);

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Products not found" });
  }
};

export const relatedProductList = async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 6;
  try {
    const product = await Product.find({
      _id: { $ne: req.product },
      category: req.product.category
    })
      .limit(limit)
      .populate("category", "_id, name");

    if (!product) throw new Error();
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: "Product not found" });
  }
};

export const categoriesList = async (req, res) => {
  try {
    const categories = await Product.distinct("category", {});
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Categories not found" });
  }
};

export const listBySearch = async (req, res) => {
  const order = req.body.order ? req.body.order : "asc";
  const sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  const limit = req.body.limit ? parseInt(req.body.limit) : 100;
  const skip = parseInt(req.body.skip);
  const findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  try {
    const products = await Product.find(findArgs)
      .select("-photo")
      .populate("category")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit);

    res.json({
      size: products.length,
      products
    });
  } catch (error) {
    res.status(400).json({ error: "Products not found" });
  }
};

export const getPhoto = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};
