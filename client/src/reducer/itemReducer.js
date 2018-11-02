import { IS_FETCHED } from "../action/types";

const initialState = {
  isFetched: false,
  fetchedData: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case IS_FETCHED:
      return {
        ...state,
        isFetched: !state.isFetched,
        fetchedData: action.payload
      };
    default:
      return state;
  }
}
