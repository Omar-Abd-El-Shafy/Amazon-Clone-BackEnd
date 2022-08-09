const User = require("../../Model/user");

exports.resetPasswordSubmit = async (req, res) => {
  console.log(req.params, req.body, req.user_id);
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    if (req.body.password) {
      console.log("hi");
      user.password = req.body.password;

      await user
        .save()
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
