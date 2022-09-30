const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    title: {
      type: String,
    },
    img: {
      type: String,
    },
    url: {
      type: String,
    },
    author: {
      type: String,
    },
    desc: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
