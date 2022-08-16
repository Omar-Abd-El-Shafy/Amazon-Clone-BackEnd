const Product = require("../../Model/product");

exports.updateProduct = async (req, res, next) => {
  try {
    let {
      id,
      name,
      description,
      price,
      department,
      category,
      brand,
      weight,
      stock,
      cod,
    } = req.body;
    price = Number(price);
    stock = Number(stock);
    weight = Number(weight);

    let image_path = req.files.map((file) => {
      return file.location;
    });

    // check if other product has the same name
    const oldProduct = await Product.findOne({ name, _id: { $ne: id } });
    if (oldProduct) {
      return res.status(409).send("A Product already Exist with Same Name");
    }

    // update fields
    const fields = {
      name,
      description,
      price,
      department,
      category,
      brand,
      weight,
      stock,
      cod,
    };

    // check if images exist
    // important so we dont override old images with empty array if no new images were sent
    // imgaes are optional in update, so user doesnt have to upload new images
    // everytime a product updates
    if (image_path.length) {
      fields.image_path = image_path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, fields, {
      new: true,
    });

    if (!updatedProduct) {
      const error = new Error("product not found enter a valid id");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).send(updatedProduct);
  } catch (err) {
    next(err);
  }
};
