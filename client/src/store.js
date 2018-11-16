import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";
const middleware = [thunk];

const initialState = {};

const store = createStore(
  rootReducer, // index.js (root Reducer)
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
// [] -> reducer, {} -> initial state,
export default store;
