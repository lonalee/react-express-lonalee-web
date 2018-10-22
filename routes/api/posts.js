const express = require("express");
const router = express.Router();

// @route GET api/posts
// @desc Get test
// @access Public
router.get("/test", (req, res) => res.json({ msg: "posts.js works" }));

module.exports = router;
