// Category model
const Category = require("../../Model/category");

exports.getCategoryById = async (req, res, next) => {
  const category_id = req.body.id || req.params.id;
  await Category.findOne({ category_id })
    .then((category) => res.status(200).json(category))
    .catch((err) => {
      err.statusCode = 400;
      next(err);
    });
};
