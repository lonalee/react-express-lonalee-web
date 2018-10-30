import Axios from "axios";
import { GET_ERRORS } from "./types";

export const loginUser = (userdata, history) => dispatch => {
  Axios.post("api/users/login", userdata)
    .then(res => {
      history.push("/Profile");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
