// root reducer

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import itemReducer from "./itemReducer";
import profileReducer from "./profileReducer";
import myprofileReducer from "./myProfileReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  items: itemReducer,
  profile: profileReducer,
  myProfile: myprofileReducer
  // 하위 reducer인 authReducer를 import하여
  // store에서 rootReducer를 import한다.
});
