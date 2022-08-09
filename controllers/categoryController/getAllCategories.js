// Category model
const Category = require("../../Model/category");

exports.getAllCategories = async (req, res, next) => {
  await Category.find()
    .populate("department", "name")
    .then((categories) => res.status(200).json(categories))
    .catch((err) => {
      next(err);
    });
};
