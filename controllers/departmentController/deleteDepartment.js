// department model
const Department = require("../../Model/department");

exports.deleteDepartment = async (req, res, next) => {
  // get department_id from user
  const department_id = req.body.id || req.params.id;
  await Department.findOneAndDelete({ department_id })
    .then((dept) => {
      res.status(200).send(`Department ${dept.name} deleted`);
    })
    .catch((err) => {
      err.statusCode = 404;
      next(err);
    });
};
