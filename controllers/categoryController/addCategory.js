// Category model
const Category = require("../../Model/category");
const Department = require("../../Model/department");
const newError = require("../../utils/newError");

exports.addCategory = async (req, res, next) => {
  try {
    // Get user input
    const name = req.body.name;
    const department_id = req.body.department;

    // check if valid department
    const department = await Department.findById(department_id);

    if (!department) {
      throw newError(404, "Department not found");
    }

    // save dept in db
    await Category.create({
      name,
      department: department_id,
    })
      .then((category) => {
        res.status(201).json(category);
      })
      .catch((err) => {
        err.statusCode = 400;
        next(err);
      });
  } catch (err) {
    next(err);
  }
};
