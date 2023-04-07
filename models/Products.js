const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  specialTags: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  isSold: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Products", productSchema);
