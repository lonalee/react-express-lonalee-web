const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    // 프로퍼티의 길이가 조건을 만족하지 않으면
    errors.name = "Name must be more than 2, less than 30 characters";
  }
  if (validator.isEmpty(data.name)) {
    // name의 length가 0이면
    errors.name = "Name field is required";
  }
  if (!validator.isEmail(data.email)) {
    // email 형식이 아니면 실행
    errors.email = "Email field is invalid";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password is required";
  }
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  return {
    errors, //errors: errors,
    isValid: isEmpty(errors) // name에 대한 rule이 만족되지 않으면 해당 프로퍼티의 값은 false
  };
  // 객체를 반환한다
};
