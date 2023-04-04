const { handleCustomErr } = require("../errors/custom-error");
const asyncWrapper = require("../middlewares/async");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const login = asyncWrapper(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(handleCustomErr("Username and password must be provided", 400));
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(201).json({ msg: "user created", token });
});

const dashboard = async(req,res) => {
    const luckyNum = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: {
        "name": req.user.username,
        "Your authentication code": luckyNum,
      },
    });
};

module.exports = { login, dashboard };
