const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");

function _handleError(err, res, customError) {
  console.log("error", err);
  res.status(customError.status).json({ message: customError.message });
}

function _hashPassword(password) {
  return bcrypt.genSalt(10).then((salt) => bcrypt.hash(password, salt));
}

async function _comparePasswords(password, hashedPassword) {
  const isSame = await bcrypt.compare(password, hashedPassword);
  return isSame;
}

function _unauthorizedHandle(errorResponse) {
  errorResponse.message = "unauthorized";
  errorResponse.status = 400;
  throw errorResponse;
}

function createUser(encryptPassword, user) {
  const newUser = {
    username: user.username,
    password: encryptPassword,
    name: user.name,
  };
  return User.create(newUser);
}

module.exports.register = function (req, res) {
  _hashPassword(req.body.password)
    .then((encryptPassword) => createUser(encryptPassword, req.body))
    .then((createdUser) => res.status(201).json(createdUser))
    .catch((err) => {
      const myError = {
        message: "Error creating user",
        status: 500,
      };
      _handleError(err, res, myError);
    });
};

module.exports.login = function (req, res) {
  const { username } = req.body;
  const myError = {
    message: "",
    status: 0,
  };
  User.findOne({ username })
    .then(function (user) {
      if (!user) _unauthorizedHandle(myError);
      return _comparePasswords(req.body.password, user.password);
    })
    .then((isSame) => {
      if (!isSame) _unauthorizedHandle(myError);
      const token = jwt.sign({ name: user.name }, process.env.PASS_PHRASE, {
        expiresIn: 3600,
      });
      res.status(200).json({ success: true, token });
    })
    .catch((err) => {
      _handleError(err, res, myError);
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
