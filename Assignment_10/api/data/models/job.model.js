const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: String,
  address: String,
});

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  salary: {
    type: Number,
  },
  location: locationSchema,
  description: {
    type: String,
  },
  experience: String,
  skills: [String],
  postDate: {
    type: Date,
    max: Date.now(),
  },
});

mongoose.model("Job", jobSchema, "jobs");
