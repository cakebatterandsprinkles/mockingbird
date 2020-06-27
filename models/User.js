const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: new Date().toISOString().substring(0, 10),
  },
  resetToken: String,
  resetTokenExpiration: Date,
});

module.exports = User = mongoose.model("user", UserSchema);
