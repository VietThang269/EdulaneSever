const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const enrolledClassSchema = new Schema({
    classCode: { type: String, required: true },
    joinCode: { type: String, required: true },
    joined_at: { type: String, required: true },
    user_id: { type: String, required: true },
}, {
  timestamps: true,
});

const EnrolledClass = mongoose.model('EnrolledClass', enrolledClassSchema);

module.exports = EnrolledClass;