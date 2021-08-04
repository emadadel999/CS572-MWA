const mongoose = require("mongoose");

const Game = mongoose.model("Game");

function _handleError(err, res) {
  console.log("error", err);
  res.status(err.status).json(err.message);
}

function _noGameErrorHandle(status, message) {
  const errResponse = {
    status: status,
    message: message,
  };
  throw errResponse;
}

function _checkHasProperty(game, reqToCheck) {
  for (const key in game) {
    if (reqToCheck.hasOwnProperty(key)) {
      if (Array.isArray(game[key])) {
        game[key] = [...game[key], reqToCheck[key]];
      } else {
        game[key] = reqToCheck[key];
      }
    }
  }
  return game;
}

module.exports.gamesGetAll = function (req, res) {
  const count = req.query.count ? parseInt(req.query.count) : 5;
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;

  if (isNaN(offset) || isNaN(count)) {
    res.status(400).json({ message: "please use numbers" });
  } else {
    Game.find()
      .skip(offset)
      .limit(count)
      .then((games) => res.status(200).json(games))
      .catch((err) => _handleError(err, res));
  }
};

module.exports.gamesGetOne = function (req, res) {
  const { gameId } = req.params;

  Game.findById(gameId)
    .then((game) => res.status(200).json(game))
    .catch((err) => _handleError(err, res));
};

module.exports.gamesAddOne = function (req, res) {
  const newGame = {
    title: req.body.title,
    year: req.body.year,
    rate: req.body.rate,
    minPlayers: req.body.minPlayers,
    maxPlayers: req.body.maxPlayers,
    minAge: req.body.minAge,
    price: req.body.price,
    designers: [req.body.designer],
    publisher: req.body.publisher,
    reviews: [req.body.review],
  };
  Game.create(newGame)
    .then((result) => res.status(201).json(result))
    .catch((err) => _handleError(err, res));
};

module.exports.gamesFullUpdateOne = function (req, res) {
  // PUT is full update
  const gameId = req.params.gameId;
  const gameToUpdate = {
    ...req.body,
  };
  console.log(gameToUpdate);

  Game.findByIdAndUpdate(gameId, gameToUpdate, { new: true })
    .then(function (updatedGame) {
      if (!updatedGame) _noGameErrorHandle(404, "game not found");
      res.status(204).json(updatedGame);
    })
    .catch((err) => _handleError(err, res));
};

module.exports.gamesPartialUpdateOne = function (req, res) {
  // PATCH is partial update
  const { gameId } = req.params;

  Game.findById(gameId)
    .then(function (game) {
      if (!game) _noGameErrorHandle(404, "game not found");
      const gameAfterUpdate = _checkHasProperty(game, req.body);
      return gameAfterUpdate.save();
    })
    .then((updatedGame) => res.status(204).json(updatedGame))
    .catch((err) => _handleError(err, res));
};

module.exports.gamesDeleteOne = function (req, res) {
  const { gameId } = req.params;
  Game.findByIdAndDelete(gameId)
    .then(function (game) {
      if (!game) _noGameErrorHandle(404, "game not found");
      res.status(204).json(game);
    })
    .catch((err) => _handleError(err, res));
};
