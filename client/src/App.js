import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./action/authActions";
import { logoutUser } from "./action/authActions";
import { clearCurrentProfile } from "./action/profileActions";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";

import Profile from "./components/profile/Profile";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ItemList from "./components/list/ItemList";
import Dashboard from "./components/dashboard/Dashboard";
import "./App.css";
import "./queries.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    // redirect to landing page
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            {/* <Landing /> */}
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/Profile" component={Profile} />
              <Route exact path="/Login" component={Login} />
              <Route exact path="/Register" component={Register} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/ItemList" component={ItemList} />
              {/* App.js에서 라우트 태그로 정의해준다 */}
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
