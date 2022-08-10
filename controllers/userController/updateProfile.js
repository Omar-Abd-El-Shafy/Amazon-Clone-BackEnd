const User = require("../../Model/user");

// method to update user name or email or phone
// update password has its own method
exports.updateProfile = async (req, res, next) => {
  try {
    //  req.body contains name or email or phone
    //  so we pass it dirctely to findOneAndUpdate as the update object
    // update in db
    await User.findByIdAndUpdate(req.user_id, req.body, {
      new: true,
    }).then((updatedUser) => {
      res.status(200).send("Profile updated");
    });
  } catch (err) {
    next(err);
  }
};
