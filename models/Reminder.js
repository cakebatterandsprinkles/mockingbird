const mongoose = require("mongoose");
const ReminderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  label: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
  timeInterval: {
    type: Number,
    default: 60,
  },
  startTime: {
    type: String,
    default: "",
  },
  finishTime: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: new Date().toISOString().substring(0, 10),
  },
});

module.exports = Reminder = mongoose.model("reminder", ReminderSchema);
