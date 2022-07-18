// will transefer register logic from app to this file
const User = require("../Model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    // Get user input
    const { first_name, last_name, email, phone, password, confirm_password } = req.body;

    //DONE in userValidator
    // Validate user input            // we need more validation //////..//////
    // if (!(email && password && first_name && last_name)) {
    //   return res.status(400).send("All input is required");
    // }

    // check if user already exist
    // Validate if user exist in our database
    let oldUser, emailOrPhone;
    if(email) {
      oldUser = await User.findOne({ email });
      emailOrPhone = "email";
    }
    else if(phone) {
      oldUser = await User.findOne({ phone });
      emailOrPhone = "phone";
    }

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    // encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    await User.create({
      first_name,
      last_name,
      [emailOrPhone]: email? email.toLowerCase() : phone, // convert email to lowercase
      password
    }).then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      err.statusCode = 400;
      next(err);
    });

    // Create token
    // const token = jwt.sign(
    //   { user_id: user._id, email }, // adding atoken which contains user id and email // "_id" is generated autoamtically from mongoose
    //   process.env.TOKEN_KEY,
    //   {

    //     expiresIn: "2h",

    //   }
    // );
    // save user token
    // user.token = token;
    // return new user

    // res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};
