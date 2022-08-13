const User = require("../../Model/user");

exports.getAllUsers = async (req, res, next) => {
  const itemsPerPage = req.query.itemsPerPage || 10,
    page = req.query.page - 1 || 0;
  await User.find({})
    .select("-password")
    .limit(itemsPerPage)
    .skip(page * itemsPerPage)
    .then((users) => res.status(200).json(users))
    .catch((err) => {
      next(err);
    });
};
