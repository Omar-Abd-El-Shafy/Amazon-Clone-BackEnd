const User = require("../../Model/user");
const jwt = require("jsonwebtoken");

//TO DO

exports.getUserProfile = async (req, res) => {
  const user_id = req.user_id;
  const userProfile = await User.findOne({ user_id });
  if (userProfile) {
    const { first_name, last_name, email, phone } = userProfile;
    res.status(200).json({ first_name, last_name, email, phone });
  } else {
    res.status(400).send("User not found ");
  }
};
