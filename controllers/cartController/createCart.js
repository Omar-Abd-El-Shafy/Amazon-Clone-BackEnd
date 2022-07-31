// const Cart = require("../../Model/cart");
// const newError = require("../../utils/newError");
// const User = require("../../Model/user");

// exports.createCart = async (req, res, next) => {
//   try {
//     const user_id = req.body.user_id;
//     const User = await User.findById(user_id);

//     if (!User) {
//       throw newError(404, "user not found");
//     }

//     await Cart.create({ user: user_id }).then((cart) => {
//       res.status(200).send("Cart Created");
//     });
//   } catch (err) {
//     next(err);
//   }
// };
