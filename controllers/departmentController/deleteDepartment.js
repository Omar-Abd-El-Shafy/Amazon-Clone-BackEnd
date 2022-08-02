// department model
const Department = require("../../Model/department");
const newError = require("../../utils/newError");

exports.deleteDepartment = async (req, res, next) => {
  // get department _id from user
  const department_id = req.body.id || req.params.id;
  await Department.findByIdAndDelete(department_id)
    .then((dept) => {
      if (dept) {
        res.status(200).send(`Department ${dept.name} deleted`);
      } else {
        // res.status(400).send(`No such department`);
        throw newError(404, "Department not found");
      }
    })
    .catch((err) => {
      next(err);
    });
};
