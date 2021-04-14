const mongoose = require("mongoose");
require("mongoose-currency").loadType(mongoose);

const Currency = mongoose.Types.Currency;

const Schema = mongoose.Schema;

const promotionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
});

var Promotions = mongoose.model("Promo", promotionSchema);

module.exports = Promotions;
