// Category model
const Category = require("../../Model/category");

exports.deleteCategory = async (req, res, next) => {
  // get category_id from user
  const category_id = req.body.id || req.params.id;
  await Category.findOneAndDelete({ category_id })
    .then((category) => {
      if(category) {
        res.status(200).send(`Category ${category.name} deleted`);
      } else {
        res.status(400).send(`No such category`);
      }
    })
    .catch((err) => {
      err.statusCode = 400;
      next(err);
    });
};
