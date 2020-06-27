const mongoose = require("mongoose");
const JournalEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  heard: {
    type: Array,
    default: [],
  },
  saw: {
    type: Array,
    default: [],
  },
  thought: {
    type: Array,
    default: [],
  },
  words: {
    type: Array,
    default: [],
  },
  new: {
    type: String,
    default: "",
  },
  addition: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: new Date().toISOString().substring(0, 10),
  },
});

module.exports = JournalEntry = mongoose.model(
  "journalEntry",
  JournalEntrySchema
);
