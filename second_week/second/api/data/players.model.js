const mongoose = require("mongoose");

const trophySchema = new mongoose.Schema({
  name: String,
  won: Number,
  lost: Number,
  winningRate: Number,
});

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  dateOfBirth: String,
  nationality: String,
  preferredGround: String,
  trophies: [trophySchema],
});

mongoose.model("Player", playerSchema, "players");
