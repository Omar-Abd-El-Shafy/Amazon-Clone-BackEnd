const User = require("../../Model/user");

exports.deleteAccount = async (req, res, next) => {
  try {
    const deletedUser = await User.deleteOne({ _id: req.user_id })
      .then((data) => res.status(200).send(`User ${data.name} deleted.`))
      .catch((err) => next(err));
    // await deletedUser
    //   .remove()
    //   .then((data) => res.status(200).send(`User ${data.name} deleted.`))
    //   .catch((err) => next(err));
  } catch (err) {
    next(err);
  }
};
