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
      return res.status(400).json({ error: "Image could not be uploaded" });
    }
    const isValid = validator.formDataValidation({...fields, ...files});
    if (!isValid) {
      return res.status(400).json({ error: "All fields ar required" });
    }
    const product = new Product(fields);
    if (files.photo) {
      if (files.photo.size > 500000) {
        return res
          .status(400)
          .json({ error: "Image should be less than 500 kb in size" });
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
