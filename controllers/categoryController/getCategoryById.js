// Category model
const Category = require("../../Model/category");
const newError = require("../../utils/newError");

exports.getCategoryById = async (req, res, next) => {
  const category_id = req.params.id;
  await Category.findById(category_id)
    .populate("department", "name")
    .then((category) => {
      if (category) {
        res.status(200).json(category);
      } else {
        throw newError(404, "Category not found");
      }
    })
    .catch((err) => {
      err.statusCode = 400;
      next(err);
    });
};
