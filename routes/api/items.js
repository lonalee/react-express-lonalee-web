const express = require("express");
const router = express.Router();

// Item Model
const Item = require("../../models/Item");

// @route GET api/items
// @desc Get All Items
// @access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 }) // 내림차순
    .then(items => res.json(items));
}); // server.js 에서 /api/items로 router를 정의했음

// @route POST api/items
// @desc Create An Item
// @access Public
router.post("/", (req, res) => {
  // split req.body.content with '\n' into an array
  const newItem = new Item({
    userid: req.body.id,
    content: req.body.content,
    heading: req.body.heading
  });
  newItem.save().then(item => res.json(item));
});
// @route DELETE api/items/:id
// @desc DELETE An Item
// @access Public
router.delete("/:id", (req, res) => {
  Item.findOne({ userid: req.params.id })
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});
// @route DELETE api/items/all
// @desc DELETE All
// @access Public
router.delete("/all", (req, res) => {
  Item.find()
    .then(items => items.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ err }));
});

// export default router; // es6
module.exports = router;
