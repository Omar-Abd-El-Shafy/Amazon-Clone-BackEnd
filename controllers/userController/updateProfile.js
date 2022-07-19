const User = require("../../Model/user");

//TO DO

exports.updateProfile = async (req, res, next) => {

  await User.updateOne({ user_id: req.user_id }, { ...req.body }, { new: true })
    .then(({ first_name, last_name, email, phone, password }) => {
      res.status(200).send({ first_name, last_name, email, phone, password });
    })
    .catch((err) => {
      next(err);
    });
};
