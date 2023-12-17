const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    age: Number,
  },
  {
    collection: "authors",
    timestamps: true,
  }
);

module.exports = mongoose.model("Author", authorSchema);
