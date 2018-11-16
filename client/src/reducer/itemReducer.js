import { IS_FETCHED, IS_DELETED, IS_UPDATED } from "../action/types";
import { IS_ADDED } from "../action/types";

const initialState = {
  isFetched: false,
  isAdded: false,
  isDeleted: false,
  fetchedData: [],
  addedData: {},
  deletedId: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case IS_FETCHED:
      return {
        ...state,
        isFetched: !state.isFetched,
        fetchedData: action.payload.map(item => {
          return {
            ...item,
            isChecked: false,
            isUpdated: false
          };
        })
      };
    case IS_ADDED:
      let newDataSet = [];
      state.fetchedData
        ? (newDataSet = [action.payload, ...state.fetchedData])
        : (newDataSet = [action.payload]);
      console.log("newDataSet", newDataSet);
      return {
        ...state,
        fetchedData: newDataSet.map(item => {
          return { ...item, isChecked: false, isUpdated: false };
        }),
        isAdded: action.payload ? true : false,
        addedData: action.payload
      };
    case IS_UPDATED:
      return {
        ...state,
        fetchedData: state.fetchedData.map(item => {
          return item.userid === action.updateObject
            ? { ...item, content: action.payload }
            : item;
        })
      };
    case IS_DELETED:
      return {
        ...state,
        isDeleted: !state.isDeleted,
        deletedId: action.payload
      };
    default:
      return state;
  }
}
