const User = require("../../Model/user");
const jwt = require("jsonwebtoken");

exports.getUserProfile = async (req, res) => {
  const user_id = req.user_id;
  const userProfile = await User.findById(user_id);
  if (userProfile) {
    // get password?
    const { name, email, phone } = userProfile;
    res.status(200).json({ name, email, phone });
  } else {
    res.status(404).send("User not found ");
  }
};
