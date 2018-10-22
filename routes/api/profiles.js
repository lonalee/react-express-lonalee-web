const express = require("express");
const router = express.Router();

// @route GET api/profiles
// @desc Get test
// @access Public
router.get("/test", (req, res) => res.json({ msg: "profiles.js works" }));

module.exports = router;
