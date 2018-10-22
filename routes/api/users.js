const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// @route GET api/users
// @desc Get test
// @access Public
router.get("/test", (req, res) => res.json({ msg: "users.js works" }));

// @route POST api/users/register
// @desc Post a new user
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return res.status(400).json(errors);
  // register 규칙을 만족시키지 못했다면 (isValid === false) 400 응답과 errors 객체의 내용을 보여준다
  User.findOne({ email: req.body.email }).then(user => {
    //findOne의 결과
    if (user) {
      return res.status(400).json({ email: "email already exists" });
    } //기존 이메일 존재
    else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "pg", // rate
        d: "mm" // default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user)) // created newUser를 인자로 받아서 json으로 응답
            .catch(err => console.log(err));
        });
      });
    }
  });
});
// @route POST api/users/login
// @desc Post user login info. / Return token (JWT)
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }) // 생략 가능 -> email
    .then(user => {
      // 검색 결과 user인자를 받아서
      if (!user) {
        errors.email = "User not found";
        res.status(404).json(errors);
      }
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // 정상 로그인 시도
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          };
          // payload와 key를 이용하여 사용자 별 token 생성
          // 토큰 생성
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
                // 이 후에는 token을 header에 담아서 GET 요청이 되고 이 토큰을 passport를 통해서 검증한다.
              });
            }
          );
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    });
});

// @route GET api/users/current
// @desc return current User
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // res.json({ msg: "success" });
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);
//jwt = strategy
module.exports = router;
