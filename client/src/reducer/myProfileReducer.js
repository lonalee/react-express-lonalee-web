const initialState = {
  myHistory: [],
  myAchievements: []
};

const myprofileReducer = (state = initialState, action) => {
  console.log("initialState, action", state, action);
  switch (action.type) {
    case "TEST_SETCURRENTPROFILE":
      return {
        ...state,
        myHistory: [action.payload, ...state.myHistory]
      };
    default:
      return state;
  }
};

export default myprofileReducer;
