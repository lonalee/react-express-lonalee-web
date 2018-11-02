import Axios from "axios";
import { IS_FETCHED } from "./types";

export const postItem = newItem => dispatch => {
  Axios.post("/api/items", newItem)
    .then(res => {
      console.log(res.response.data);
    })
    .catch(err => {
      console.log(err.response);
    });
};

export const fetchItem = () => dispatch => {
  Axios.get("/api/items").then(res => {
    dispatch({
      type: IS_FETCHED,
      payload: res.data
    });
  });
};
