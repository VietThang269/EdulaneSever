const router = require("express").Router();
let Book = require("../models/book.model");

router.post("/", async (req, res, next) => {
  const newBook = new Book({
    title: req.body.title,
    img: req.body.img,
    url: req.body.url,
    author: req.body.author,
    desc: req.body.desc,
    category: req.body.category,
  });
  try {
    const result = await newBook.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const book = await Book.find();
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
