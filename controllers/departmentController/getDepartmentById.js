// department model
const Department = require("../../Model/department");

exports.getDepartmentById = async (req, res, next) => {
  const department_id = req.body.id || req.params.id;
  await Department.findOne({ department_id })
    .then((dept) => res.status(200).json(dept))
    .catch((err) => {
      err.statusCode = 400;
      next(err);
    });
};
