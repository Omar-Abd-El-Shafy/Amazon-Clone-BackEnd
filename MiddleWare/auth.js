// this middleware function can be added to any route to authenticate a special token given , we can create a token specified to admin
// in env variables and use it to authorize admin routes (I mean different admin secret token key)

const jwt = require("jsonwebtoken");
require("dotenv").config();
let config;

const verifyToken = (req, res, next) => {
  if (req.body.type === "resetStart") {
    config = process.env.TOKEN_KEY_FORGOT_PASSWORD;
  }
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    console.log("hi");
    // console.log(req.user);
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config); // here we match the token we got with the secret key we have
    req.user_id = decoded.user_id;

    // console.log(req.userID);
    //req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
