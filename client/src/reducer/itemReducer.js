import { IS_FETCHED } from "../action/types";
import { IS_ADDED } from "../action/types";

const initialState = {
  isFetched: false,
  isAdded: false,
  fetchedData: [],
  addedData: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case IS_FETCHED:
      return {
        ...state,
        isFetched: !state.isFetched,
        fetchedData: action.payload
      };
    case IS_ADDED:
      return {
        ...state,
        isAdded: !state.isAdded,
        addedData: action.payload
      };
    default:
      return state;
  }
}
