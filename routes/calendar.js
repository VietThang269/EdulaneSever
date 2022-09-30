const router = require("express").Router();
let Calendar = require("../models/calendar.model");

router.get("/get_data/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const calendar = await Calendar.find({ userId });
    res.status(200).json(calendar);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get_data_day/", async (req, res, next) => {
  // const userId = req.body.userId;
  // const date = req.body.date;
  const userId = req.query.data.split(".")[0];
  const date = req.query.data.split(".")[1];

  try {
    const calendar = await Calendar.find({ userId, date });
    res.status(200).json(calendar);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res, next) => {
  const newCalendar = new Calendar({
    userId: req.body.userId,
    content: req.body.content,
    date: req.body.date,
    type: req.body.type,
    startAt: req.body.startAt,
    endAt: req.body.endAt,
  });
  try {
    const result = await newCalendar.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
