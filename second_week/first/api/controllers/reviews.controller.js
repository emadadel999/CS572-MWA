const mongoose = require("mongoose");

const Game = mongoose.model("Game");

const _addReview = function (req, res, game) {
  const newReview = {
    name: req.body.name,
    review: req.body.review,
    date: req.body.date,
  };

  //after manually changing the given db reviews type from string to []
  game.reviews = [...game.reviews, newReview];

  game.save(function (err, savedGame) {
    const response = {
      status: 201,
      message: savedGame,
    };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    console.log(response.message);
    res.status(response.status).json(response.message);
  });
};

module.exports.reviewsGetAll = function (req, res) {
  const { gameId } = req.params;

  Game.findById(gameId)
    .select("reviews")
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
      res.status(response.status).json(response.message.reviews);
    });
};

module.exports.reviewsGetOne = function (req, res) {
  const { gameId, reviewId } = req.params;

  Game.findById(gameId)
    .select("reviews")
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
      const theReview = response.message.reviews.id(reviewId);
      res.status(response.status).json(theReview);
    });
};

module.exports.reviewsAddOne = function (req, res) {
  const { gameId } = req.params;

  Game.findById(gameId)
    .select("reviews")
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
        _addReview(req, res, game);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};
