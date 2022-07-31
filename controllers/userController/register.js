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
      return res.status(409).send("User Already Exist. Please Login");
    }

    // Create user in our database
    await User.create({
      name,
      email,
      phone,
      password,
    })
      .then((user) => {
        // Create token
        const token = jwt.sign(
          { user_id: User.id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "10d",
          }
        );

        res.header("x-access-token", token);
        res.status(201).send("register success");
      })
      .catch((err) => {
        err.statusCode = 400;
        next(err);
      });
  } catch (err) {
    console.log(err);
  }
};
