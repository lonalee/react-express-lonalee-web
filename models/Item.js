const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  userid: { type: String },
  content: { type: [String], required: true },
  heading: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = Item = mongoose.model("item", ItemSchema);
