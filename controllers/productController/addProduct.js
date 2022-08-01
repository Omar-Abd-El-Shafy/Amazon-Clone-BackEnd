const Product = require("../../Model/product");

exports.addProduct = async (req, res, next) => {
  if (!req.files) {
    throw new Error("lol");
  }
  let image_path = req.files.map((file) => {
    return file.location;
  });

  console.log(image_path);
  const {
    name,
    description,
    price,
    quantity,
    department,
    category,
    brand,
    weight,
    stock,
  } = req.body;

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
    quantity,
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
};
