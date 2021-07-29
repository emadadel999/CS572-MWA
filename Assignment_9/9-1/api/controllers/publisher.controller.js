const mongoose = require("mongoose");

const Game = mongoose.model("Game");

const _addPublisher = function (req, res, game) {
  game.publisher.name = req.body.name;
  game.publisher.country = req.body.country;
  game.save(function (err, savedGame) {
    const response = {
      status: 201,
      message: savedGame,
    };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.publisherGetOne = function (req, res) {
  const { gameId } = req.params;

  Game.findById(gameId)
    .select("publisher")
    .exec(function (err, game) {
      const response = {
        status: 200,
        message: game,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!game) {
        response.status = 404;
        response.message = { message: "game not found" };
      }
      console.log(response.message);
      res.status(response.status).json(response.message.publisher);
    });
};

module.exports.publisherAddOne = function (req, res) {
  const { gameId } = req.params;

  Game.findById(gameId)
    .select("publisher")
    .exec(function (err, game) {
      const response = {
        status: 201,
        message: game,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!game) {
        response.status = 404;
        response.message = { message: "game not found" };
      } else if (response.status === 201) {
        _addPublisher(req, res, game);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};
