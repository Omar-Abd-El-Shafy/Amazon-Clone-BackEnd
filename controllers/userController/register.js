const User = require("../../Model/user");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// // Create token
// const token = jwt.sign(
//   { user_id: user._id, email },
//   process.env.TOKEN_KEY,
//   {
//     expiresIn: "2h",
//   }
// );
// // save user token
// user.token = token;

exports.register = async (req, res, next) => {
  try {
    // Get user input
    const { name, email, phone, password } = req.body;

    let oldUser = await User.findOne({ email });
    if (!oldUser) {
      oldUser = await User.findOne({ phone });
    }

    if (oldUser) {
      return res.status(409).send("Email or Phone already exists.");
    }

    // Create user in our database
    const user = await User.create({
      name,
      email,
      phone,
      password,
    }).then((user) => {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "10d",
        }
      );

      // res.header("x-access-token", token);
      res.status(201).send({ token: token, user });
    });
  } catch (err) {
    next(err);
  }
};
