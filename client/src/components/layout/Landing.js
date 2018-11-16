import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3">Stay Connected</h1>

                <Link to="/register" className="landing-btn btn btn-lg mr-2">
                  Sign Up
                </Link>
                {/* a 태그는 link 태그로 바뀌어야 한다, (in React, router 적용 후) */}
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapPropstoState = state => ({
  auth: state.auth
});
export default connect(mapPropstoState)(Landing);
