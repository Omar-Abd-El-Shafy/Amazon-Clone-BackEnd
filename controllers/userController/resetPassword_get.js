const User = require("../../Model/user");

exports.resetPassword_get = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return User.status(400).send({ message: "Invalid link" });

    res.status(200).send("Valid Url");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
