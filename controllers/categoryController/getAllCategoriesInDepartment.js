// Category model
const Category = require("../../Model/category");

// to get all categories in one dept by dept _id
exports.getAllCategoriesInDepartment = async (req, res, next) => {
  const department = req.params.id;
  await Category.find({ department })
    .populate("department", "name")
    .then((categories) => res.status(200).json(categories))
    .catch((err) => {
      next(err);
    });
};
