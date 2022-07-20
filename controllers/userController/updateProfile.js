const User = require("../../Model/user");
const bcrypt = require("bcryptjs");
//TO DO

exports.updateProfile = async (req, res, next) => {
  try {
    // old code [To DELETE Later]
    // if (password) {
    //   const password = await bcrypt.hash(req.body.password, 10);
    // }
    // await User.findOneAndUpdate(
    //   { user_id: req.user_id },
    //   { ...req.body, password },
    //   { new: true }
    // )
    //   .then(({ first_name, last_name, email, phone, password }) => {
    //     res.status(200).send({ first_name, last_name, email, phone, password });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     next(err);
    //   });

    let user = await User.findOne({ user_id: req.user_id });
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
        console.log(err);
        next(err);
      });
  } catch (err) {
    console.log(err);
  }
};
