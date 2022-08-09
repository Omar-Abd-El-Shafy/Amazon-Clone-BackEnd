// department model
const Department = require("../../Model/department");
const newError = require("../../utils/newError");

exports.deleteDepartment = async (req, res, next) => {
  // get department _id from user
  await Department.findByIdAndDelete(req.params.id)
    .then((dept) => {
      if (dept) {
        res.status(200).send(`Department ${dept.name} deleted`);
      } else {
        throw newError(404, "Department not found");
      }
    })
    .catch((err) => {
      next(err);
    });
};
