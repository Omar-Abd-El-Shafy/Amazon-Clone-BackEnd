const { validationResult } = require("express-validator");

// result middleware
// Extracts the validation errors from a request and makes them available in a Result object.
// must be the last validation middleware
const validationResults = (req, res, next) => {
  if (req.body.type === "resetStart") {
    //  res.status(200).json({ msg: "continue" });
    return next();
  }
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  next();
};

module.exports = validationResults;
