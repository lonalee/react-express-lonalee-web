const express = require("express");
const router = express.Router();
const MyProfile = require("../../models/MyProfile");

router.get("/", (req, res) => {
  res.json({ msg: "test works" });
});

router.post("/", (req, res) => {
  console.log(req.body);
  const profiles = new MyProfile({
    userId: req.body.userId,
    history: req.body.myHistory.map(his => {
      return his.history;
    }),
    historyDate: req.body.myHistory.map(his => {
      return his.historyDate;
    }),
    achievement: req.body.myAchievements.map(ach => {
      return ach.achievement;
    }),
    achievementDate: req.body.myAchievements.map(ach => {
      return ach.achievementDate;
    }),
    skill: req.body.mySkills.map(skill => {
      return skill.skill;
    })
  });
  console.log(profiles);
  profiles
    .save()
    .then(profile => res.json(profile))
    .catch(err => res.json(err));
});

module.exports = router;
