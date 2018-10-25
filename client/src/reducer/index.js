// root reducer

import { combineReducers } from "redux";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer
  // 하위 reducer인 authReducer를 import하여
  // store에서 rootReducer를 import한다.
});
