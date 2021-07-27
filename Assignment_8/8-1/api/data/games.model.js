const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  country: {
    type: String,
  },
});

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  review: {
    type: String,
  },
  date: {
    type: String,
  },
});

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: Number,
  rate: {
    type: Number,
    min: 1,
    max: 5,
    default: 1,
  },
  price: Number,
  minPlayers: {
    type: Number,
    min: 1,
    max: 10,
  },
  maxPLayers: { type: Number, min: 1, max: 10 },
  minAge: Number,
  designers: [String],
  publisher: publisherSchema,
  reviews: [reviewSchema],
});

mongoose.model("Game", gameSchema, "games");
