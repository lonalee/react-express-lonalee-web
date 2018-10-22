const express = require("express");
const router = express.Router();

// @route GET api/users
// @desc Get test
// @access Public
router.get("/test", (req, res) => res.json({ msg: "users.js works" }));

module.exports = router;
