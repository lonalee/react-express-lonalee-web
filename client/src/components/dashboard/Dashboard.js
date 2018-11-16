import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../action/profileActions";

class Dashboard extends Component {
  componentDidMount() {
    console.log("Dashboard");
    this.props.getCurrentProfile();
  }
  render() {
    return (
      <div>
        <h1
          style={{
            marginTop: "100px"
          }}
        >
          Dashboard
        </h1>
      </div>
    );
  }
}

export default connect(
  null,
  { getCurrentProfile }
)(Dashboard);

// export default connect(
//   null,
//   { getCurrentProfile }
// )(Dashboard);  ====> getCurrentProfile 메소드가 props에 연결되었다
