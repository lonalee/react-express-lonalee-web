import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from "../action/types";

const initialState = {
  profile: null, // 개별 profile
  profiles: null, // 배열
  loading: false // loading 때만 true -> spinner
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      console.log("loading", PROFILE_LOADING);
      return {
        ...state,
        loading: true
      };

    case GET_PROFILE:
      console.log("GET_PROFILE", GET_PROFILE);
      return {
        ...state,
        profile: action.payload,
        loading: false
      };

    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: action.payload
      };

    default:
      return state;
  }
}
