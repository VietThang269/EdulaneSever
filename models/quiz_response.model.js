const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quizResponseSchema = new Schema(
  {
    user_answer: { type: Array, required: false },
    total_correct: { type: Number, required: false },
    total_wrong: { type: Number, required: false },
    scores: { type: Number, required: true },
    user_id: { type: String, required: true },
    quiz_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const QuizResponse = mongoose.model("QuizResponse", quizResponseSchema);

module.exports = QuizResponse;
