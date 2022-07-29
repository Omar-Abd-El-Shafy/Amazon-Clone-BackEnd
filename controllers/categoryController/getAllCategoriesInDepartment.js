// Category model
const Category = require("../../Model/category");

// to get all categories in one dept by dept id
exports.getAllCategoriesInDepartment = async (req, res, next) => {
  const department_id = req.body.id || req.params.id;
  await Category.find({["department.department_id"]: department_id})
    .then((categories) => res.status(200).json(categories))
    .catch((err) => {
      next(err);
    });
};
