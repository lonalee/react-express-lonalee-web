import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../action/loginActions";
import PropTypes from "prop-types";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(user);
    this.props.loginUser(user, this.props.history);
  }
  render() {
    return (
      <div className="login">
        <div className="container page-container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  // 이 함수가 이 컴퍼넌트의 props와 state의 프로퍼티를 매핑
  login: state.login, // state.auth는 루트 리듀서의 auth 프로퍼티를 지칭
  errors: state.errors // 에러발생시 컴퍼넌트의 errors props(새로이 생성)와 errors state 매핑
  //props가 새롭게 생성될 때 메소드 호출 => componentwillreceiveprops
});

// get a COMPONENT connected to STORE
export default connect(
  mapStatetoProps,
  // 해당 메소드를 인자로 전달하면 전체 store의 상태(state)에
  // auth 프로퍼티가 정의되면서 root reducer의 auth프로퍼티를 할당(매핑, store의 state와 컴퍼넌트의 프로퍼티)하게 된다.
  // null,
  { loginUser }
)(withRouter(Login));
