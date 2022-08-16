const { getCart } = require("./getCart");
const { addItem } = require("./addItem");
const { removeItem } = require("./removeItem");
const { emptyCart } = require("./emptyCart");
const { incItemByOne } = require("./incItemByOne");
//combine methods in cartController in an obj
const cartController = {
  getCart,
  addItem,
  removeItem,
  emptyCart,
  incItemByOne,
};

//to use in productRoute
module.exports = cartController;
