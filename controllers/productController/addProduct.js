const Product = require("../../Model/product");

// product_id: { type: Number },
// name: { type: String, required: true },
// description: { type: String, required: true },
// price: { type: Number, required: true },
// quantity: { type: Number, required: true },
// image_path: { type: String },
// department: {
//   department_id: { type: Number },
//   department_name: { type: String },
// },
// category: {
//   category_id: { type: Number },
//   category_name: { type: String },
// },

exports.addProduct = async (req, res, next) => {
  try {
    const { name, description, price, quantity } = req.body;



    let oldProduct;

    if (name) {
      oldProduct = await User.findOne({ name });
    }
    if (oldProduct) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    // Create user in our database
    await Product.create({
      name,
      description,
      price, // convert email to lowercase
      quantity,
    })
      .then((product) => {
        res.status(201).json(product);
      })
      .catch((err) => {
        err.statusCode = 400;
        next(err);
      });

    // res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};
