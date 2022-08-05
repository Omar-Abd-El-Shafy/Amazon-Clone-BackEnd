const User = require("../../Model/user");
const Cart = require("../../Model/cart");
exports.deleteAccount = async (req, res, next) => {
  try {
    const deletedUser = await User.findById(req.user_id);
    await deletedUser.deleteOne();

    await Cart.deleteOne({ user: req.user_id }).then(() => {
      res.status(200).send(`User ${deletedUser.name} deleted.`);
    });

    // await deletedUser
    //   .remove()
    //   .then((data) => res.status(200).send(`User ${data.name} deleted.`))
    //   .catch((err) => next(err));
  } catch (err) {
    next(err);
  }
};
