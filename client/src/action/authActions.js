// REGISTER
import Axios from "axios";
import { GET_ERRORS } from "./types";

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
