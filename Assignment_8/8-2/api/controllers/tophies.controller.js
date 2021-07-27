const mongoose = require("mongoose");

const Player = mongoose.model("Player");

const _addTrophy = function (req, res, player) {
  const newTrophy = {
    name: req.body.name,
    won: req.body.won,
    lost: req.body.lost,
    winningRate: req.body.winningRate,
  };

  player.trophies.push(newTrophy);

  player.save(function (err, savedPlayer) {
    const response = {
      status: 201,
      message: savedPlayer,
    };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.trophiesGetAll = function (req, res) {
  const { playerId } = req.params;

  Player.findById(playerId)
    .select("trophies")
    .exec(function (err, player) {
      const response = {
        status: 200,
        message: player,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!player) {
        response.status = 404;
        response.message = { message: "player not found" };
      }
      console.log(response.message);
      res.status(response.status).json(response.message.trophies);
    });
};

module.exports.trophiesGetOne = function (req, res) {
  const { playerId, trophyId } = req.params;

  Player.findById(playerId)
    .select("trophies")
    .exec(function (err, player) {
      const response = {
        status: 200,
        message: player,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!player) {
        response.status = 404;
        response.message = { message: "player not found" };
      }
      console.log(response.message);
      const theTrophy = response.message.trophies.id(trophyId);
      res.status(response.status).json(theTrophy);
    });
};

module.exports.trophiesAddOne = function (req, res) {
  const { playerId } = req.params;

  Player.findById(playerId)
    .select("trophies")
    .exec(function (err, player) {
      const response = {
        status: 201,
        message: player,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!player) {
        response.status = 404;
        response.message = { message: "player not found" };
      } else if (response.status === 201) {
        _addTrophy(req, res, player);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

module.exports.trophiesUpdateOne = function (req, res) {
  const { playerId, trophyId } = req.params;

  Player.findById(playerId, "trophies", {}, function (err, player) {
    const response = {
      status: 201,
      message: player,
    };
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!player) {
      response.status = 404;
      response.message = { message: "player not found" };
    }
    const trophy = player.trophies.id(trophyId);

    for (const key in trophy) {
      // if the field we have in req.body exists, we're gonna update it
      if (req.body.hasOwnProperty(key)) {
        trophy[key] = req.body[key];
      }
    }
    console.log(trophy);
    player.save(function (err) {
      if (err) {
        response.status = 500;
        response.message = err;
      }
      console.log(response);
      res.status(response.status).json(response.message);
    });
  });
};

module.exports.trophiesDeleteOne = function (req, res) {
  const { playerId, trophyId } = req.params;

  Player.findById(playerId, "trophies", {}, function (err, player) {
    const trophy = player.trophies.id(trophyId);

    const response = {
      status: 201,
      message: player,
    };
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!player) {
      response.status = 404;
      response.message = { message: "player not found" };
    }

    trophy.remove();
    player.save(function (err) {
      if (err) {
        response.status = 500;
        response.message = err;
      }
      res.status(response.status).json(response.message);
    });
  });
};
