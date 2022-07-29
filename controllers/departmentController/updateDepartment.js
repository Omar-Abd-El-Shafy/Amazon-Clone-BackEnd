// department model
const Department = require("../../Model/department");
const newError = require("../../utils/newError");

exports.updateDepartment = async (req, res, next) => {
  // get department_id and name from user
  const department_id = req.body.id || req.params.id;
  const name = req.body.name || req.params.name;

  // update in db
  await Department.findOneAndUpdate({ department_id }, { name }, { new: true })
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
