// Category model
const Category = require("../../Model/category");
const newError = require("../../utils/newError");

exports.deleteCategory = async (req, res, next) => {
  // get category _id from user
  await Category.findByIdAndDelete(req.params.id)
    .then((category) => {
      if (category) {
        res.status(200).send(`Category ${category.name} deleted`);
      } else {
        throw newError(404, "Category not found");
      }
    })
    .catch((err) => {
      next(err);
    });
};
