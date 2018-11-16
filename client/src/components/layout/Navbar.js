// import React from 'react'   //rfc for shortcut

// export default () => {
//   return (
//     <div>

//     </div>
//   )
// }
import React, { Component } from "react"; //rcc
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { logoutUser } from "../../action/authActions";
import { clearCurrentProfile } from "../../action/profileActions";

class Navbar extends Component {
  clickLogout(e) {
    e.preventDefault();
    this.props.logoutUser();
    // console.log(this.props);
    this.props.clearCurrentProfile();
    this.props.history.push("/");
  }

  clickProfile() {
    if (!this.props.auth.isAuthenticated) {
      alert("로그인이 필요합니다");
    }
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    // 로그인 여부를 알기 위해서 state의 isAuthenticated 프로퍼티가 필요함
    // mapPropstoState를 통해서 컴퍼넌트의 프로퍼티로 가져와서 객체로 destructuring함

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/Register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/ItemList">
            my item List
          </Link>
        </li>
      </ul>
    );
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li
          className="nav-item"
          style={{
            padding: "8.5px 0",
            marginRight: "20px"
          }}
        >
          <button onClick={this.clickLogout.bind(this)}>
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{
                width: "25px",
                height: "25px",
                marginRight: "5px"
              }}
            />{" "}
            Logout
          </button>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/ItemList">
            my item List
          </Link>
        </li>
      </ul>
    );
    // const authProfile = ();
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4 fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            LonaLee WEB
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link
                  onClick={this.clickProfile.bind(this)}
                  className="nav-link"
                  to={this.props.auth.isAuthenticated ? "/Profile" : "/Login"}
                >
                  {" "}
                  Profile
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapPropstoState = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapPropstoState,
  { logoutUser, clearCurrentProfile }
)(withRouter(Navbar));
