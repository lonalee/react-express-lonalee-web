const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const validateProfileInput = require("../../validation/profile");

const Profile = require("../../models/Profiles");
const User = require("../../models/User");
// @route GET api/profiles
// @desc Get test
// @access Public
router.get("/test", (req, res) => res.json({ msg: "profiles.js works" }));

// @route GET api/profile
// @desc Get current Users Profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route GET api/profile/handle/:handle
// @desc Get Profile by handle
// @access Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    // req.params.handle === /handle/:handle 전자의 handle = 후자의 handle
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.handle = "There is no profile for the user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => {
      errors.handle = "There is no profile for the user";
      res.status(404).json(errors);
    });
});

// @route GET api/profile/user/:user_id
// @desc Get Profile by user ID
// @access Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    // req.params.user_id === /handle/:user_id 전자의 user_id = 후자의 user_id
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.user = "There is no profile for the user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => {
      errors.user = "There is no profile for the user";
      res.status(404).json(errors);
    });
});
// @route GET api/profile/all
// @desc Get all Profiles
// @access Public
router.get("/all", (req, res) => {
  Profile.find()
    .then(profiles => {
      if (!profiles) {
        res.status(404).json({ error: "There are no profiles" });
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ error: "There are no profiles" }));
});

// @route POST api/profile
// @desc Create && Edit Users Profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id; //
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills -> split into an array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    // Social
    profileFields.social = {};

    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create
        // Check if the handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "The handle already exists";
            res.status(400).json(errors);
          }
          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);
module.exports = router;
