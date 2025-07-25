const mongoose = require("mongoose");
const joi = require("joi");
const { type } = require("os");
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true
  }
});

const Category = mongoose.model("Category", CategorySchema);

const categoryValidator = joi.object({
  name: joi.string().required(),
  image: joi.string().required()
});

const categoryUpdateValidator = joi.object({
  name: joi.string().optional(),
  image: joi.string().optional()
}).min(1);


module.exports = { Category, categoryValidator, categoryUpdateValidator };
