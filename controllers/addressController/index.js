const { getAllAddressesOfUser } = require("./getAllAddressesOfUser");
const { getAddressById } = require("./getAddressById");
const { addAddress } = require("./addAddress");

const addressController = {
  getAllAddressesOfUser,
  getAddressById,
  addAddress,
};

module.exports = addressController;
