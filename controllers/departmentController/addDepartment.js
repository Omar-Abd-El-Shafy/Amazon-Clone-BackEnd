// department model
const Department = require("../../Model/department");

exports.addDepartment = async (req, res, next) => {
  try {
    // Get user input
    const name  = req.body.name || req.params.name;
    // save dept in db
    await Department.create({
      name,
    })
      .then((dept) => {
        res.status(201).send(dept);
      })
      .catch((err) => {
        err.statusCode = 400;
        next(err);
      });
  } catch (err) {
    next(err);
  }
};

