const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");

module.exports.register = function (req, res) {
  console.log("Register user");
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, encryptPassword) {
      const newUser = {
        username: req.body.username,
        password: encryptPassword,
        name: req.body.name,
      };
      User.create(newUser, function (err, createdUser) {
        if (err) {
          console.log("Error creating user", err);
          res.status(201).json({ message: err });
        } else {
          console.log("User created");
          res.status(201).json(createdUser);
        }
      });
    });
  });
};

module.exports.login = function (req, res) {
  console.log("Logging in");
  const { username } = req.body;
  User.findOne({ username }, function (err, user) {
    if (err) {
      console.log(("error finding user", err));
      res.status(500).json(err);
    } else if (user) {
      console.log("user found");
      bcrypt.compare(req.body.password, user.password, function (err, isSame) {
        if (isSame) {
          console.log("login successful");
          const token = jwt.sign({ name: user.name }, process.env.PASS_PHRASE, {
            expiresIn: 3600,
          });
          res.status(200).json({ success: true, token });
        } else if (err) {
          console.log("encryption err:", err);
          res.status(500).json({ message: "server err" });
        } else {
          console.log("password incorrect");
          res.status(400).json({ message: "unauthorized" });
        }
      });
    } else {
      console.log("username not found");
      res.status(400).json({ message: "unauthorized" });
    }
  });
};

module.exports.authenticate = function (req, res, next) {
  const headerExists = req.headers.authorization;
  if (headerExists) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.PASS_PHRASE, function (err, decoded) {
      if (err) {
        console.log("jwt verify err", err);
        res.status(401).json({ message: "unauthorized" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).json({ message: "token missing" });
  }
};
