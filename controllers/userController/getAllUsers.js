const User = require("../../Model/user");

exports.getAllUsers = async (req, res) => {
  const itemsPerPage = 10,
    page = req.params.page || 0;
  await User.find({})
    .select("name email phone")
    .limit(itemsPerPage)
    .skip(page * itemsPerPage)
    .sort({ createdAt: "ascending" })
    .then((users) => res.status(200).json(users))
    .catch((err) => {
      next(err);
    });
};
