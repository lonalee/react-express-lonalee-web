const initialState = {
  myHistory: [],
  myAchievements: [],
  mySkills: []
};

const myprofileReducer = (state = initialState, action) => {
  console.log("initialState, action", state, action);
  switch (action.type) {
    case "SETPROFILE_HISTORY":
      return {
        ...state,
        [action.payload.ref]: [action.payload, ...state.myHistory]
      };
    case "SETPROFILE_ACHIEVEMENT":
      return {
        ...state,
        [action.payload.ref]: [action.payload, ...state.myAchievements]
      };
    case "SETPROFILE_MYSKILLS":
      return {
        ...state,
        [action.payload.ref]: [action.payload, ...state.mySkills]
      };
    default:
      return state;
  }
};

export default myprofileReducer;
