const Product = require("../../Model/product");

exports.addProduct = async (req, res, next) => {
  try {
    let image_path = req.files.map((file) => {
      return file.location;
    });

    let {
      name,
      description,
      price,
      department,
      category,
      brand,
      weight,
      stock,
    } = req.body;
    price = Number(price);
    stock = Number(stock);
    weight = Number(weight);

    let oldProduct;
    if (name) {
      oldProduct = await Product.findOne({ name });
    }
    if (oldProduct) {
      return res.status(409).send("A Product already Exist with Same Name");
    }
    // Create Product in our database
    await Product.create({
      name,
      description,
      price, // convert email to lowercase
      image_path,
      department,
      category,
      brand,
      weight,
      stock,
    })
      .then((product) => {
        res.status(201).json(product);
      })
      .catch((err) => {
        err.statusCode = 400;

        next(err);
      });
  } catch (err) {
    next(err);
  }
};
