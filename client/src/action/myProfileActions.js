export const setCurrentProfile = value => dispatch => {
  console.log(value);
  dispatch({
    type: "TEST_SETCURRENTPROFILE",
    payload: value
  });
};
