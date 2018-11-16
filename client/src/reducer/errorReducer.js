import { GET_ERRORS } from "../action/types";

const initialState = {}; // error 객체 전용의 상태 표시

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload; // err.response.data
    default:
      return state;
  }
}
