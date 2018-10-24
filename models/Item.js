const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  userid: { type: String },
  name: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = Item = mongoose.model("item", ItemSchema);
