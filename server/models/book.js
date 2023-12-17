const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    genre: String,
    authorId: Number,
  },
  {
    collection: "books",
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
