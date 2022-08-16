const Address = require("../../Model/address");

exports.getAllAddressesOfUser = async (req, res, next) => {
  try {
    const user = req.user_id;
    const addresses = await Address.find({ user });

    if (!addresses.length) {
      res.status(404).send("Address not found");
    }

    res.status(200).json(addresses);
  } catch (err) {
    next(err);
  }
};
