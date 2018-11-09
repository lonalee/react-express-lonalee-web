import Axios from "axios";
import { IS_FETCHED } from "./types";
import { IS_ADDED } from "./types";
import { IS_UPDATED } from "./types";

export const postItem = newItem => dispatch => {
  console.log(newItem);
  Axios.post("/api/items", newItem)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: IS_ADDED,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
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

export const updateItem = (id, updatedContent) => dispatch => {
  console.log(updatedContent);
  Axios.put(`/api/items/${id}`, updatedContent)
    .then(res => {
      dispatch({
        type: IS_UPDATED,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
