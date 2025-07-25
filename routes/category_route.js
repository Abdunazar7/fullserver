const express = require("express");
const {
  Category,
  categoryValidator,
  categoryUpdateValidator,
} = require("./../models/category_model");
const route = express.Router();

route.post("/", async (req, res) => {
  try {
    let { value, error } = categoryValidator.validate(req.body);
    if (error) {
      return res.json({ message: error.details[0].message });
    }
    const category = new Category(value);
    await category.save();
    res.status(201).send({ message: "New category created.", category });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

route.get("/", async (req, res) => {
  try {
    const categorys = await Category.find();
    res.status(200).send(categorys);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).send({ message: "Not found!" });
    }

    res.status(200).send(category);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).send({ message: "Incorrect ID!" });
    }
    res.status(500).send({ message: err.message });
  }
});

route.patch("/:id", async (req, res) => {
  try {
    let { value, error } = categoryUpdateValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const category = await Category.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });

    if (!category) {
      return res.status(404).send({ error: "Not Found!" });
    }

    res.status(200).send({ message: "Category updated.", category });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).send({ error: "Not found!" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = route;
