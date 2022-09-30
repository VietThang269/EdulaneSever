const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quizSchema = new Schema(
  {
    title: { type: String, required: true },
    instruction: { type: String, required: false },
    quiz_questions: [
      {
        name: { type: String },
        option: { type: Array },
        correctOption: { type: String },
      },
    ],
    startingDate: { type: String, required: true },
    repeatQuiz: { type: Boolean, required: true },
    author_id: { type: String, required: true },
    class_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
