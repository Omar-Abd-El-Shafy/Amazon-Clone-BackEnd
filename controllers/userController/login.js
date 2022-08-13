// will transefer login logic from app to this file
const User = require("../../Model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, phone, password } = req.body;

    // Validate if user exist in our database
    let user, emailOrPhone;
    if (email) {
      user = await User.findOne({ email });
      emailOrPhone = "email";
    } else if (phone) {
      user = await User.findOne({ phone });
      emailOrPhone = "phone";
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = await jwt.sign(
        {
          user_id: user._id,
          [emailOrPhone]: email ? email : phone,
          user_role: user.role,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "10d",
        }
      );
      // // save user token
      // user.token = token;
      // user
      // res.header("x-access-token", token);

      // send user data without password
      const sendUser = { ...user._doc };
      delete sendUser.password;
      res.status(200).send({ token: token, user: sendUser });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
  // Our login logic ends here
};
