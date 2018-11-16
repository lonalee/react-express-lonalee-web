import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import classnames from "classnames";
import { loginUser } from "../../action/authActions";
import { withRouter } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";

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

  // 컴퍼넌트가 로딩되면 로그인 여부를 확인해서 login 컴퍼넌트로의 access를 dashboard로 redirecting
  componentDidMount() {
    if (this.props.auth.isAuthenticated) this.props.history.push("/dashboard");
  }

  componentWillReceiveProps(nextProps) {
    // login 성공하여 토큰을 응답 받으면 private Routing
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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
    console.log(this.props);
    this.props.loginUser(user, this.props.history);
  }
  render() {
    const { errors } = this.state;

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
                {/* <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div> */}
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  type="email"
                  error={errors.email}
                />
                <TextFieldGroup
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                  placeholder="password"
                />
                {/* <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div> */}
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
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  // 이 함수가 이 컴퍼넌트의 props와 state의 프로퍼티를 매핑
  auth: state.auth, // state.auth는 루트 리듀서의 auth 프로퍼티를 지칭
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
