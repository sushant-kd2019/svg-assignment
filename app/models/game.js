const mongoose = require("mongoose");

var gameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishedDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("game", gameSchema);
