const mongoose = require("mongoose");

const Player = mongoose.model("Player");

module.exports.playersGetAll = function (req, res) {
  const count = req.query.count ? parseInt(req.query.count) : 5;
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;

  if (isNaN(offset) || isNaN(count)) {
    res.status(400).json({ message: "please use numbers" });
  } else {
    Player.find()
      .skip(offset)
      .limit(count)
      .exec(function (err, players) {
        if (err) {
          console.log("error finding players");
          res.status(500).json(err);
        } else {
          console.log("Found players", players.length);
          res.status(200).json(players);
        }
      });
  }
};

module.exports.playersGetOne = function (req, res) {
  const { playerId } = req.params;

  Player.findById(playerId).exec(function (err, player) {
    const response = {
      status: 200,
      message: player,
    };
    if (err) {
      response.status = 500;
      response.message = "server error finding player";
    } else if (!player) {
      response.status = 404;
      response.message = "player not found";
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.playersAddOne = function (req, res) {
  const newplayer = {
    /// creating a clone of the req.body object
    /// to avoid modifing user input
    ...req.body,
    trophies: [req.body.trophy],
  };
  console.log(newplayer);
  Player.create(newplayer, function (err, result) {
    const response = {
      status: 201,
      message: result,
    };
    if (err) {
      response.status = 500;
      response.message = "server error creating player";
    } else {
      res.status(response.status).json(response.message);
    }
  });
};

module.exports.playersFullUpdateOne = function (req, res) {
  // PUT is full update
  const { playerId } = req.params;

  Player.findById(playerId).exec(function (err, player) {
    const response = {
      status: 204,
      message: player,
    };
    if (err) {
      response.status = 500;
      response.message = "server error finding player";
    } else if (!player) {
      response.status = 404;
      response.message = "player not found";
    } else if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      //update everything in the player doc
      player.name = req.body.name;
      player.age = req.body.age;
      player.dateOfBirth = req.body.dateOfBirth;
      player.preferredGround = req.body.preferredGround;
      if (req.body.trophies) {
        player.trophies.push(req.body.trophies);
      }

      player.save(function (err, updatedplayer) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.message = updatedplayer;
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};

module.exports.playersPartialUpdateOne = function (req, res) {
  // PATCH is partial update
  const { playerId } = req.params;

  Player.findById(playerId).exec(function (err, player) {
    const response = {
      status: 204,
      message: player,
    };
    if (err) {
      response.status = 500;
      response.message = "server error finding player";
    } else if (!player) {
      response.status = 404;
      response.message = "player not found";
    } else if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      for (const key in player) {
        // if the field we have in req.body exists, we're gonna update it
        if (req.body.hasOwnProperty(key)) {
          if (Array.isArray(player[key])) {
            player[key].push(req.body[key]);
          } else {
            player[key] = req.body[key];
          }
        }
      }
      console.log(player);
      player.save(function (err, updatedplayer) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.message = updatedplayer;
        }
        console.log(response);
        res.status(response.status).json(response.message);
      });
    }
  });
};

module.exports.playersDeleteOne = function (req, res) {
  const { playerId } = req.params;

  Player.findByIdAndDelete(playerId).exec(function (err, player) {
    const response = {
      status: 204,
      message: player,
    };
    if (err) {
      response.status = 500;
      response.message = "server error finding player";
    } else if (!player) {
      response.status = 404;
      response.message = "player not found";
    }
    res.status(response.status).json(response.message);
  });
};
