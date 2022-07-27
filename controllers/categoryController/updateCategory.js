// Category model
const Category = require("../../Model/category");
const Department = require("../../Model/department");

exports.updateCategory = async (req, res, next) => {
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
    return res.status(400).send("Invalid department");
  }

  // update in db
  await Category.findOneAndUpdate(
    { category_id },
    { name, department: { department_id, department_name } },
    { new: true }
  )
    .then((category) => {
      res.status(200).send(category);
    })
    .catch((err) => {
      err.statusCode = 404;
      next(err);
    });
};
