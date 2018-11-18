// /api/profiles
import axios from "axios";

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profiles")
    .then(res =>
      // (console.log("res", res.data),
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => {
      // console.log("err", err);
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

//setProfileLoading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//clearCurrentProfile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
    payload: null
  };
};
