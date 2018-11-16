const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";
  // 빈 입력이 넘어올 때 null or undefined로 들어오는 것을 방지하기 위해서이다

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle must be between 2 and 40 characters";
  }
  if (validator.isEmpty(data.handle)) {
    errors.handle = "Handle is required";
  }
  if (validator.isEmpty(data.status)) {
    errors.status = "Status is required";
  }
  if (validator.isEmpty(data.skills)) {
    errors.skills = "Skills is required";
  }
  if (!isEmpty(data.website)) {
    // 공백이 아닐 때만 URL을 체크하도록
    if (!validator.isURL(data.website)) {
      errors.website = "Not valid URL";
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "Not valid URL";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "Not valid URL";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "Not valid URL";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "Not valid URL";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "Not valid URL";
    }
  }
  return {
    errors, //errors: errors,
    isValid: isEmpty(errors) // name에 대한 rule이 만족되지 않으면 해당 프로퍼티의 값은 false
  };
  // 객체를 반환한다
};
