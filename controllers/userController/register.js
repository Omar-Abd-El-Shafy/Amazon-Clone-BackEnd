// will transefer register logic from app to this file
const User = require("../../Model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    // Get user input
    const { name, email, phone, password } = req.body;

    let oldUser, emailOrPhone;
    if (email) {
      oldUser = await User.findOne({ email });
      emailOrPhone = "email";
    } else if (phone) {
      oldUser = await User.findOne({ phone });
      emailOrPhone = "phone";
    }

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    // Create user in our database
    await User.create({
      name,
      [emailOrPhone]: email ? email : phone, 
      password,
    })
      .then((user) => {
        res.status(201).send(user);
      })
      .catch((err) => {
        err.statusCode = 400;
        next(err);
      });

  } catch (err) {
    console.log(err);
  }
};
