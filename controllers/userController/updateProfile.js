const User = require("../../Model/user");

// method to update user name or email or phone
// update password has its own method
exports.updateProfile = async (req, res, next) => {
  try {
    // Get user input
    const { name, email, phone } = req.body;
    let toUpdate = {};

    // check if unique email or phone
    // and append value to toUpdate obj
    if (email) {
      let oldUser = await User.findOne({ email });
      if (oldUser) {
        return res.status(409).send("Email already exists.");
      }
      toUpdate.email = email;
    } else if (phone) {
      let oldUser = await User.findOne({ phone });
      if (oldUser) {
        return res.status(409).send("Phone already exists.");
      }
      toUpdate.phone = phone;
    } else if (name) {
      toUpdate.name = name;
    }

    // update in db
    const user = await User.findByIdAndUpdate(req.user_id, toUpdate, {
      new: true,
    });

    if (!user) {
      res.status(404).send("User not found");
    }

    const sendUser = { ...user._doc };
    delete sendUser.password;
    res.status(200).send({ user: sendUser });
  } catch (err) {
    next(err);
  }
};
