import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../action/profileActions";
import Spinner from "../common/spinner";

class Dashboard extends Component {
  componentDidMount() {
    console.log("Dashboard");
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (loading || profile === null) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.values(profile) > 0)
        dashboardContent = <h4>Hello {user.name}</h4>;
    }

    return (
      <div
        className="dashboard"
        style={{
          marginTop: "100px"
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.PropTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStatetoProps,
  { getCurrentProfile }
)(Dashboard);

// export default connect(
//   null,
//   { getCurrentProfile }
// )(Dashboard);  ====> getCurrentProfile 메소드가 props에 연결되었다
