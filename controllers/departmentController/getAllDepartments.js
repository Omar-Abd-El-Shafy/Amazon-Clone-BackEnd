// department model
const Department = require("../../Model/department");

exports.getAllDepartments = (req, res, next) => {
  Department.find({})
    .then((depts) => res.status(200).json(depts))
    .catch((err) => {
      err.statusCode = 400;
      next(err);
    });
};
