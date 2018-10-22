const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function loginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

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

  return {
    errors, //errors: errors,
    isValid: isEmpty(errors) // name에 대한 rule이 만족되지 않으면 해당 프로퍼티의 값은 false
  };
  // 객체를 반환한다
};
