const User = require("../models/User");

const login = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email, password });
  if (findUser) {
    return res.status(200).json({
      status: "success",
      user: findUser,
    });
  } else {
    return res.status(403).json({
      message: "Invalid Credentials",
    });
  }
};
const register = async (req, res) => {
  const { email, password, fullName } = req.body;
  const findUser = await User.create({ email, password, fullName });
  return res.status(201).json({
    user: findUser,
  });
};

module.exports = {
  register,
  login,
};
