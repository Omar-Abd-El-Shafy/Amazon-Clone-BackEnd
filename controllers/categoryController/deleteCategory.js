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
        res.status(404).send(`Invlaid category id`);
      }
    })
    .catch((err) => {
      err.statusCode = 404;
      next(err);
    });
};
