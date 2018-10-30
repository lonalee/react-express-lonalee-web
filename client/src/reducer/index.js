// root reducer

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import loginReducer from "./loginReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  login: loginReducer
  // 하위 reducer인 authReducer를 import하여
  // store에서 rootReducer를 import한다.
});
