// Category model
const Category = require("../../Model/category");
const Department = require("../../Model/department");

exports.addCategory = async (req, res, next) => {
  try {
    // Get user input
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
      return res.status(400).send("Invalid department");
    }

    // save dept in db
    await Category.create({
      name,
      department: { department_id, department_name },
    })
      .then((category) => {
        res.status(201).send(category);
      })
      .catch((err) => {
        err.statusCode = 400;
        next(err);
      });
  } catch (err) {
    next(err);
  }
};
