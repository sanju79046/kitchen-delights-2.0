const mongoose = require("mongoose");

const Kitchen = mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  name: { type: String, required: true, trim: true },
  image: {
    type: String,
    required: [true, "Image url is required"],
    trim: true,
  },
  cuisineType: { type: String },
  location: { type: String, required: true, trim: true },
  menuItems: [
    {
      name: String,
      mealType: String,
      image: String,
      description: String,
      price: Number,
    },
  ],
});

module.exports = mongoose.model("kitchen", Kitchen);
