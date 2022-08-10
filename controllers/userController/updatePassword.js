const User = require("../../Model/user");

exports.updatePassword = async (req, res, next) => {
  try {
    // Get user input
    const { password } = req.body;

    // get user data from db
    let user = await User.findById( req.user_id);
    // update password
    user.password = password;

    // Updating Using save()
    // Mongoose documents track changes. You can modify a document using vanilla JavaScript assignments
    // and Mongoose will convert it into MongoDB update operators
    // why using save isntead of updateOne?
    // The save() function is generally the right way to update a document with Mongoose.
    // With save(), you get full validation and middleware.
    // Note that update(), updateMany(), findOneAndUpdate(), etc. do not execute save() middleware.
    // the pre() function used in user model is a middleware, so we use save() to execute it.
    await user.save().then((updatedUser) => {
      res.status(200).send("Password updated");
    });
  } catch (err) {
    next(err);
  }
};
