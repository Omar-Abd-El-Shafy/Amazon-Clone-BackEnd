const User = require("../../Model/user");

exports.deleteAccount = async (req, res, next) => {
  try {
    User.findOneAndDelete({ user_id: req.user_id })
      .then((data) => res.status(200).send(`User ${data.name} deleted.`))
      .catch((err) => next(err));
  } catch (err) {
    next(err);
  }
};
