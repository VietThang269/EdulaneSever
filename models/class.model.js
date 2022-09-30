const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classSchema = new Schema(
  {
    className: { type: String, required: true },
    section: { type: String, required: false },
    subject: { type: String, required: true },
    room: { type: String, required: false },
    joinCode: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    member: [
      {
        memberId: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
