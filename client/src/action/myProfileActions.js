import Axios from "axios";

export const setCurrentProfile = value => dispatch => {
  console.log(value);

  if (value.ref === "myHistory") {
    dispatch({
      type: "SETPROFILE_HISTORY",
      payload: value
    });
  } else if (value.ref === "myAchievements") {
    dispatch({
      type: "SETPROFILE_ACHIEVEMENT",
      payload: value
    });
  } else if (value.ref === "mySkills") {
    dispatch({
      type: "SETPROFILE_MYSKILLS",
      payload: value
    });
  }
};

export const saveMyPofile = value => dispatch => {
  console.log(value);
  Axios.post("/api/myprofile", value)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
