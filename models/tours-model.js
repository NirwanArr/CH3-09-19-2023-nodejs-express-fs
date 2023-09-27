const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nama tour harus ada"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4,
  },
  price: {
    type: Number,
    required: [true, "Harga  harus ada"],
  },
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
