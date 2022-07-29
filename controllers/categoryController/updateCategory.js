// Category model
const Category = require("../../Model/category");
const Department = require("../../Model/department");
const newError = require("../../utils/newError");

exports.updateCategory = async (req, res, next) => {
  try {
    // Get user input
    const category_id = req.body.id || req.params.id;
    const name = req.body.name || req.params.name;
    const department_id = req.body.department_id || req.params.department_id;
    const department_name =
      req.body.department_name || req.params.department_name;

    // check if valid department
    const department = await Department.findOne({
      department_id,
      name: department_name,
    });

    if (!department) {
      // return res.status(400).send("Invalid department");
      throw newError(404, "Department not found");
    }

    // update in db
    await Category.findOneAndUpdate(
      { category_id },
      { name, department: { department_id, department_name } },
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
