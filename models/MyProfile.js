const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MyProfileSchema = new Schema({
  userId: { type: String, required: true },
  history: { type: String, required: true },
  historyDate: { type: String, required: true },
  achievement: { type: String, required: true },
  achievementDate: { type: String, required: true },
  skill: { type: String, required: true }
});

module.exports = MyProfile = mongoose.model("myprofile", MyProfileSchema);
