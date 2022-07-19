const User = require("../../Model/user");
const bcrypt = require("bcryptjs");
//TO DO

exports.updateProfile = async (req, res, next) => {
  if (password) {
    const password = await bcrypt.hash(req.body.password, 10);
  }
  await User.findOneAndUpdate(
    { user_id: req.user_id },
    { ...req.body, password },
    { new: true }
  )
    .then(({ first_name, last_name, email, phone, password }) => {
      res.status(200).send({ first_name, last_name, email, phone, password });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
