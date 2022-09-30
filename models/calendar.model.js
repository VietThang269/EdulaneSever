const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CalendarSchema = new Schema(
  {
    userId: {
      type: String,
    },
    content: {
      type: String,
    },
    date: {
      type: String,
    },
    type: {
      type: String,
    },
    startAt: {
      type: String,
    },
    endAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Calendar = mongoose.model("Calendar", CalendarSchema);

module.exports = Calendar;
