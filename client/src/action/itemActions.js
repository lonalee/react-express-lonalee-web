import Axios from "axios";
import { IS_FETCHED } from "./types";
import { IS_ADDED } from "./types";
import { IS_UPDATED } from "./types";
import { IS_DELETED } from "./types";

export const postItem = newItem => dispatch => {
  console.log(newItem);
  Axios.post("/api/items", newItem)
    .then(res => {
      console.log(res.data.content);
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
      console.log("return UPDATE", res.data.content);
      dispatch({
        type: IS_UPDATED,
        payload: updatedContent.content,
        updateObject: id
      });
    })
    .catch(err => console.log(err));
};

export const deleteItem = id => dispatch => {
  Axios.delete(`/api/items/${id}`)
    .then(res => {
      console.log(res);
      dispatch({
        type: IS_DELETED,
        payload: id
      });
    })
    .catch(err => console.log(err));
};
