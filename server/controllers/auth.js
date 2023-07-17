const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  console.log("CREATE OR UPDATE USER: ", req.user);
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email: email },
    { name: name, picture: picture }
  );

  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new User({
      name: name,
      picture: picture,
      email: email,
    }).save();
    console.log("NEW USER CREATED", newUser);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  await User.findOne({ email: req.user.email })
    .exec()
    .then((user) => res.json(user))
    .catch((error) => {
      throw new Error(error);
    });
};
