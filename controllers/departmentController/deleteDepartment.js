// department model
const Department = require("../../Model/department");

exports.deleteDepartment = async (req, res, next) => {
  // get department_id from user
  const department_id = req.body.id || req.params.id;
  await Department.findOneAndDelete({ department_id })
    .then((dept) => {
      if (dept) {
        res.status(200).send(`Department ${dept.name} deleted`);
      } else {
        res.status(400).send(`No such department`);
      }
    })
    .catch((err) => {
      err.statusCode = 400;
      next(err);
    });
};
