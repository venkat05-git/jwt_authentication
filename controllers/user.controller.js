const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user)
    return res.status(401).json({
      status: "user already exist",
    });

  const newUser = {
    username: req.body.username,
    password: req.body.password,
  };
  await User.create(newUser);
  res.status(201).json(newUser);
};

exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user == null)
    return res.status(404).json({
      status: "user does not exist",
    });

  try {
    if (user.password == req.body.password) {
      const accessToken = jwt.sign(
        user.username,
        process.env.ACCESS_TOKEN_SCERET
      );

      return res.status(200).json({
        status: "success",
        accessToken: accessToken,
      });
    }
    return res.status(400).json({
      status: "invalid username or password",
    });
  } catch (error) {
    return res.status(500).json({
      status: "server error",
    });
  }
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({
      status: "failed",
    });

  jwt.verify(token, process.env.ACCESS_TOKEN_SCERET, (err, user) => {
    if (err)
      return res.status(403).json({
        status: "forbidden",
      });

    req.user = user;
    next();
  });
};

exports.page = (req, res) => {
  res.status(200).json({
    status: "You have access",
  });
};
