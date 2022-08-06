const { getCart } = require("./getCart");
const { addItem } = require("./addItem");
const { removeItem } = require("./removeItem");
const { emptyCart } = require("./emptyCart");

//combine methods in cartController in an obj
const cartController = {
  getCart,
  addItem,
  removeItem,
  emptyCart,
};

//to use in productRoute
module.exports = cartController;
