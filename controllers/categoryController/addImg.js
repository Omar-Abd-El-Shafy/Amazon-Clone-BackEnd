const Category = require("../../Model/category");
const newError = require("../../utils/newError");

exports.addImg = async (req, res, next) => {
  try {
    let image_path = req.file.location;
    const id = req.params.id;

    const category = await Category.findById(id);
    if (!category) {
      throw newError(404, "Category not found");
    }

    category.image_path = image_path;

    await category.save().then((cat) => {
        console.log(cat)
      res.status(200).send("Image added");
    });
  } catch (err) {
    next(err);
  }
};
