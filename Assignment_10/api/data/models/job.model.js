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
    iv: String,
    content: String,
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
