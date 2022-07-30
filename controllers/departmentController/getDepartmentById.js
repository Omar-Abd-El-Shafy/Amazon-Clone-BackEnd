// department model
const Department = require("../../Model/department");
const newError = require("../../utils/newError");

exports.getDepartmentById = async (req, res, next) => {
  const department_id = req.body.id || req.params.id;
  await Department.findOne({ department_id })
    .then((dept) => {
      if (dept) {
        res.status(200).json(dept);
      } else {
        throw newError(404, "Department not found");
      }
    })
    .catch((err) => {
      err.statusCode = 400;
      next(err);
    });
};
