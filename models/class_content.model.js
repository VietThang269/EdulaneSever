const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classContentSchema = new Schema(
  {
    rawText: { type: String },
    attachedFileUrls: [
      {
        name: { type: String },
        url: { type: String },
        type: { type: String },
      },
    ],
    classId: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    posted_at: { type: String },
  },
  {
    timestamps: true,
  }
);

const ClassContent = mongoose.model("ClassContent", classContentSchema);

module.exports = ClassContent;
