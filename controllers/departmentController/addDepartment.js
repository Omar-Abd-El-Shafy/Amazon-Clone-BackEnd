// department model
const Department = require("../../Model/department");

exports.addDepartment = async (req, res, next) => {
  // Get user input
  const name = req.body.name || req.params.name;

  // save dept in db
  await Department.create({
    name,
  })
    .then((dept) => {
      res.status(201).json(dept);
    })
    .catch((err) => {
      next(err);
    });
};
