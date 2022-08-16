const Address = require("../../Model/address");
const newError = require("../../utils/newError");

exports.getAddressById = async (req, res, next) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      throw newError(404, "Address not found");
    }

    res.status(200).json(address);
  } catch (err) {
    next(err);
  }
};
