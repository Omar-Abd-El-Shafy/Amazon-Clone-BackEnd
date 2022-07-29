const User = require("../../Model/user");

// method to update user name or email or phone
// update password has its own method
exports.updateProfile = async (req, res, next) => {
  try {
    //  req.body contains name or email or phone
    //  so we pass it dirctely to findOneAndUpdate as the update object
    // update in db
    
    await User.findOneAndUpdate({ user_id: req.user_id }, req.body, {
      new: true,
    })
      .then((updatedUser) => {
        res.status(200).send(updatedUser);
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
};
