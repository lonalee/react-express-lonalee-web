import Axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS } from "./types";
import { SET_CURRENT_USER } from "./types";

export const registerUser = (userdata, history) => dispatch => {
  Axios.post("/api/users/register", userdata)
    .then(res => history.push("/Login"))
    // .catch(err => console.log(err.response.data));
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user Token
export const loginUser = userData => dispatch => {
  Axios.post("/api/users/login", userData)
    .then(res => {
      //save to localStorage
      const { token } = res.data;
      //set token to localStorage
      localStorage.setItem("jwtToken", token);
      // 브라우저 -> 개발자도구 -> application 탭 -> local storage -> jwtToken이라는 key로 저장되어 있음
      //set token to Auth header
      setAuthToken(token);
      // token은 userId, name 등을 포함하고 있다, 디코딩(bearer -> string)하면 활용 가능, jwt-decode
      //Decode token to get UserData
      const decoded = jwt_decode(token);
      //Set current user
      // 별도의 함수를 만들 것인데, 이 action에서는 dispatch로 해당 함수에게 정보를 알려주기만 한다.
      console.log(setCurrentUser(decoded));
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Logout
export const logoutUser = () => dispatch => {
  // remove token in local storage
  localStorage.removeItem("jwtToken");
  // remove token in request header
  setAuthToken(false);
  // set current user to {}
  dispatch(setCurrentUser({}));
};
// Set logged in user
export const setCurrentUser = decoded => {
  // return은 reducer에게로 dispatch된다
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
