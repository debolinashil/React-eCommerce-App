const Category = require("../models/category");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await new Category({
      name,
      slug: slugify(name, { lower: true, strict: true }),
    }).save();

    res.json(category);
  } catch (error) {
    res.status(400).send("Create category failed!!");
  }
};

exports.list = async (req, res) => {
  try {
    const category = await Category.find({}).sort({ createdAt: -1 }).exec();
    res.json(category);
  } catch (error) {
    res.status(400).send("Failed to get list of categories!!");
  }
};

exports.read = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug }).exec();
    res.json(category);
  } catch (error) {
    res.status(400).send("Failed to get the category");
  }
};

exports.update = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name, { lower: true, strict: true }) },
      { new: true }
    );
    res.json(category);
  } catch (error) {
    res.status(400).send("Update category failed!!");
  }
};

exports.remove = async (req, res) => {
  try {
    const removed = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(removed);
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Delete category failed!!");
  }
};
