const User = require("../../Model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../utils/sendEmail");

exports.forgotPassword = async (req, res) => {
  console.log(req.body);
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(409)
        .send({ message: "User with given email does not exist!" });

    const token = jwt.sign(
      {
        user_id: user._id,
        email: user.email,
        user_role: user.role,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    const url = `https://amazon-clone-front-nh7wu54ty-omar-abd-el-shafy.vercel.app/password-reset/${user._id}/${token}/`;
    let test = await sendEmail(user.email, "Password Reset", url);
    if (test instanceof Error) throw test;

    res
      .status(200)
      .send({ message: "Password reset link sent to your email account" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
