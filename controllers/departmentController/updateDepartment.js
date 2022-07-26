// department model
const Department = require("../../Model/department");

exports.updateDepartment = async (req, res, next) => {
  // get department_id and name from user
  const department_id = req.body.id || req.params.id;
  const name = req.body.name || req.params.name;
  const categories = req.body.categories;
  // update in db
  await Department.findOneAndUpdate({ department_id }, { name, categories }, { new: true })
    .then((dept) => {
      res.status(200).send(dept);
    })
    .catch((err) => {
      err.statusCode = 404;
      next(err);
    });
};
