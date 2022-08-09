// Category model
const Category = require("../../Model/category");
const Department = require("../../Model/department");
const newError = require("../../utils/newError");

exports.updateCategory = async (req, res, next) => {
  try {
    // Get user input
    const category_id = req.body.id;
    const name = req.body.name;
    const department_id = req.body.department;

    // check if valid department
    const department = await Department.findById(department_id);

    if (!department) {
      throw newError(404, "Department not found");
    }

    // update in db
    await Category.findByIdAndUpdate(
      category_id,
      { name, department: department_id },
      { new: true }
    )
      .then((category) => {
        if (category) {
          res.status(200).json(category);
        } else {
          throw newError(404, "Category not found");
        }
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
};
