// this middleware function can be added to any route to authenticate a special token given , we can create a token specified to admin
// in env variables and use it to authorize admin routes (I mean different admin secret token key)

const jwt = require("jsonwebtoken");
require("dotenv").config();
const config = process.env;
const User = require("../Model/user");

const isAdmin = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    // console.log(req.user);
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY); // here we match the token we got with the secret key we have

    const user_id = decoded.user_id;

    // req.user_id = decoded.user_id;
    const userProfile = await User.findById(user_id);
    if (userProfile) {
      const { role } = userProfile;

      if (role) {
        // console.log(role);
        return next();
      } else {
        return res.status(403).send("Forbidden");
      }
      //res.status(200).json({role});
    } else {
      return res.status(400).send("User not found ");
    }
    // console.log(req.userID);
    //req.user = decoded;
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
};

module.exports = isAdmin;
