// Category model
const Category = require("../../Model/category");
const newError = require("../../utils/newError");

exports.deleteCategory = async (req, res, next) => {
  // get category _id from user
  const category_id = req.body.id || req.params.id;
  await Category.findByIdAndDelete(category_id)
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
