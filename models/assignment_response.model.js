const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const assignmentResponseSchema = new Schema(
  {
    rawText: { type: String, required: false },
    assignmentFileUrl: [
      {
        name: { type: String },
        url: { type: String },
        type: { type: String },
      },
    ],
    marks: { type: String, required: false },
    name: { type: String, required: false },
    type: { type: String, required: false },
    user_id: { type: String, required: true },
    assignment_id: { type: String, required: true },
    updateAt: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const AssignmentResponse = mongoose.model(
  "AssignmentResponse",
  assignmentResponseSchema
);

module.exports = AssignmentResponse;
