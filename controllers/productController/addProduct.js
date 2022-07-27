const Product = require("../../Model/product");

exports.addProduct = async (req, res, next) => {
  try {
    let image_path = req.files.map((file) => {
      return file.location;
    });
    console.log(image_path);
    // res.json({ status: "OK", uploaded: req.files.length });
    const {
      name,
      description,
      price,
      quantity,
      department_id,
      department_name,
      category_id,
      category_name,
      brand,
      weight,

      // category,
      // brand,
      // weight,
    } = req.body;

    console.log(req.body);
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
      department: {
        department_id,
        department_name,
      },
      category: {
        category_id,
        category_name,
      },
      brand,
      weight,
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
