import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";

import Profile from "./components/profile/Profile";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ShoppingList from "./components/list/ShoppingList";
import "./App.css";
import "./queries.css";

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
              <Route exact path="/ShoppingList" component={ShoppingList} />
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
