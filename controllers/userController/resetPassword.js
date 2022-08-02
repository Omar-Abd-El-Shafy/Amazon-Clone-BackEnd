const User = require("../../Model/user");

exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return User.status(400).send({ message: "Invalid link" });

    if (req.body.password) {
      user.password = req.body.password;
      await user.save();
    }

    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
