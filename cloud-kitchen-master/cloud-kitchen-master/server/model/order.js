const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dishSchema = new Schema({
  name: String,
  mealType: String,
  image: String,
  description: String,
  price: Number,
  quantity: Number,
});

const order = new Schema({
  mealType: {
    type: String,
    required: [true, "Required meal type (breakfast,lunch,...)"],
  },
  kitchenId: {
    type: mongoose.Types.ObjectId,
    ref: "kitchen",
    required: [true, "Couldn't receive kitchen id"],
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: [true, "Couldn't receive user id"],
  },
  userName: {
    type: String,
    ref: "user",
    required: [true, "Couldn't receive user name"],
  },
  totalAmount: { type: Number, reqired: true },
  date: { type: Date, required: true },
  slot: { type: String, required: true },
  items: [dishSchema],
  instructions: String,
  number: { type: String, required: [true, "Couldn't receive number"] },
  address: { type: String, required: [true, "Couldn't receive address"] },
  status: { type: String, default: "pending" },
});

module.exports = mongoose.model("order", order);
