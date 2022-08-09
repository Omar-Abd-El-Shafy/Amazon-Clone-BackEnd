// this middleware function can be added to any route to authenticate a special token given , we can create a token specified to admin
// in env variables and use it to authorize admin routes (I mean different admin secret token key)

const jwt = require("jsonwebtoken");
require("dotenv").config();
const config = process.env;
const User = require("../Model/user");

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    // console.log(req.user);
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY); // here we match the token we got with the secret key we have

    // validate user in db
    const user = await User.findById(decoded.user_id);
    if (!user) {
      return res.status(403).send("Invalid User");
    }

    req.user_id = decoded.user_id;

    // console.log(req.userID);
    //req.user = decoded;

    return next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

module.exports = verifyToken;
