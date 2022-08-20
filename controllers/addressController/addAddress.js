const Address = require("../../Model/address");

exports.addAddress = async (req, res, next) => {
  try {
    const user = req.user_id;
    const { building, street, city, state, country, zipCode, phone } = req.body;

    // check if old address
    const oldAddress = await Address.findOne({
      user,
      building,
      street,
      city,
      state,
      country,
      zipCode,
      phone,
    });
    
    if (oldAddress) {
      return res.status(200).send("Address already exists");
    }

    const address = await Address.create({
      user,
      building,
      street,
      city,
      state,
      country,
      zipCode,
      phone,
    });

    res.status(201).json(address);
  } catch (err) {
    next(err);
  }
};
