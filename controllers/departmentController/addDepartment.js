// department model
const Department = require("../../Model/department");

exports.addDepartment = async (req, res, next) => {
  try {
    // Get user input
    const name  = req.body.name || req.params.name;
    const categories = req.body.categories;
    // save dept in db
    await Department.create({
      name,
      categories
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

