const mongoose = require("mongoose");

const User = mongoose.Schema({
  name: { type: String, required: [true, "User name is required."] },
  number: {
    type: Number,
    required: [true, "Number is required"],
    unique: [true, "entered number already exists"],
  },
  password: { type: String, required: [true, "passsword cannot be empty."] },
  privilege: { type: String, default: "user" },
});

module.exports = mongoose.model("user", User);
