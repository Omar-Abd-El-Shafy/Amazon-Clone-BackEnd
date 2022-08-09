// department model
const Department = require("../../Model/department");
const newError = require("../../utils/newError");

exports.getDepartmentById = async (req, res, next) => {
  await Department.findById(req.params.id)
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
