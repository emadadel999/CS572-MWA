const mongoose = require("mongoose");

const Game = mongoose.model("Game");

module.exports.gamesGetAll = function (req, res) {
  const count = req.query.count ? parseInt(req.query.count) : 5;
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;

  if (isNaN(offset) || isNaN(count)) {
    res.status(400).json({ message: "please use numbers" });
  } else {
    Game.find()
      .skip(offset)
      .limit(count)
      .exec(function (err, games) {
        if (err) {
          console.log("error finding games");
          res.status(500).json(err);
        } else {
          console.log("Found Games", games.length);
          res.status(200).json(games);
        }
      });
  }
};

module.exports.gamesGetOne = function (req, res) {
  const { gameId } = req.params;

  Game.findById(gameId).exec(function (err, game) {
    const response = {
      status: 200,
      message: game,
    };
    if (err) {
      response.status = 500;
      response.message = "server error finding game";
    } else if (!game) {
      response.status = 404;
      response.message = "game not found";
    }
    res.status(response.status).json(response.message);
  });
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
  Game.create(newGame, function (err, result) {
    const response = {
      status: 201,
      message: result,
    };
    if (err) {
      response.status = 500;
      response.message = "server error creating game";
    } else {
      res.status(response.status).json(response.message);
    }
  });
};

module.exports.gamesFullUpdateOne = function (req, res) {
  // PUT is full update
  const gameId = req.params.gameId;
  const gameToUpdate = {
    ...req.body,
  };
  console.log(gameToUpdate);

  Game.findByIdAndUpdate(
    gameId,
    gameToUpdate,
    { new: true },
    function (err, updatedGame) {
      const response = {
        status: 204,
        message: updatedGame,
      };
      if (err) {
        response.status = 500;
        response.message = "server error finding game";
      } else if (!updatedGame) {
        response.status = 404;
        response.message = "game not found";
      }
      console.log("got updated game", response.message);
      res.status(response.status);
    }
  );
};

module.exports.gamesPartialUpdateOne = function (req, res) {
  // PATCH is partial update
  const { gameId } = req.params;

  Game.findById(gameId).exec(function (err, game) {
    const response = {
      status: 204,
      message: game,
    };
    if (err) {
      response.status = 500;
      response.message = "server error finding game";
    } else if (!game) {
      response.status = 404;
      response.message = "game not found";
    } else if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      for (const key in game) {
        // if the field we have in req.body exists, we're gonna update it
        if (req.body.hasOwnProperty(key)) {
          if (Array.isArray(game[key])) {
            game[key] = [...game[key], req.body[key]];
          } else {
            game[key] = req.body[key];
          }
        }
      }
      game.save(function (err, updatedGame) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.message = updatedGame;
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};

module.exports.gamesDeleteOne = function (req, res) {
  const { gameId } = req.params;

  Game.findByIdAndDelete(gameId).exec(function (err, game) {
    const response = {
      status: 204,
      message: game,
    };
    if (err) {
      response.status = 500;
      response.message = "server error finding game";
    } else if (!game) {
      response.status = 404;
      response.message = "game not found";
    }
    res.status(response.status).json(response.message);
  });
};
