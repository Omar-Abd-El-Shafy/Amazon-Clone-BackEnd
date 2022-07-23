const User = require("../../Model/user");
const bcrypt = require("bcryptjs");
//TO DO

exports.updateProfile = async (req, res, next) => {
  try {
    let user = await User.findOne({ user_id: req.user_id });

     // Get user input
     const { email, phone } = req.body;

    //  check for uinque email & phone
    let otherUser;
    if (email) {
      otherUser = await User.findOne({ email });
    } else if (phone) {
      otherUser = await User.findOne({ phone });
    }

    // if true, then the provided email/phone is already used by another user
    // need to change to error instead and call next()
    if(otherUser && otherUser != user) {
      return res.status(409).send("Already Exist.");
    }

    // update fields sent by user
    for(let key in req.body) {
      user[key] = req.body[key];
    }
    // Updating Using save()
    // Mongoose documents track changes. You can modify a document using vanilla JavaScript assignments 
    // and Mongoose will convert it into MongoDB update operators
    // why using save isntead of updateOne?
    // The save() function is generally the right way to update a document with Mongoose. 
    // With save(), you get full validation and middleware.
    // Note that update(), updateMany(), findOneAndUpdate(), etc. do not execute save() middleware.
    // the pre() function used in user model is a middleware, so we use save() to execute it.
    await user
      .save()
      .then((updatedUser) => {
        res.status(200).send(updatedUser);
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
};
