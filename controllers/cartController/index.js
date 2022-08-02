const { getCart } = require("./getCart");
const { addItem } = require("./addItem");
const { removeItem } = require("./removeItem");

//combine methods in cartController in an obj
const cartController = {
  getCart,
  addItem,
  removeItem,
};

//to use in productRoute
module.exports = cartController;
