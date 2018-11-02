import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../action/authActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {} // 이 객체를 통해서 view에 사용자 입력에 대한 error들을 표시
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // 컴퍼넌트가 로딩되면 로그인 여부를 확인해서 login 컴퍼넌트로의 access를 dashboard로 redirecting
  componentDidMount() {
    if (this.props.auth.isAuthenticated) this.props.history.push("/dashboard");
  }

  // 응답으로 error를 받으면 errors props가 추가 생성되고 이것을 component state에 반영하자
  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  };

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value // e.target.name을 배열에? 배열이 아니라 그냥 구분자이다
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
    // authAction의 registerUser 호출
  }
  render() {
    const { errors } = this.state;
    // 위와 동치 const errors = this.state.errors;
    // const user = this.props.auth.user;
    // mapPropstoState 메소드로 인해서 접근 가능
    // 참고. DESTRUCTURING => { user } = this.props.auth

    console.log("props", this.props);
    console.log("state", this.state);
    return (
      <div>
        <div className="register">
          <div className="container page-container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">
                  Create your DevConnector account
                </p>
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      // className="form-control form-control-lg"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.name
                      })}
                      placeholder="Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                    {/* {this.state.errors.name} */}
                    {/* 위의 코드는 서버로부터 에러 메시지가 수신됨에 따라서 동적으로 텍스트를 생성하게 된다. 그러나 classnames를 이용해서 conditional class를 적용한다. */}
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div className="form-group">
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
                    {!errors.email && (
                      <small className="form-text text-muted">
                        This site uses Gravatar so if you want a profile image,
                        use a Gravatar email
                      </small>
                    )}
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group">
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
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password2
                      })}
                      placeholder="Confirm Password"
                      name="password2"
                      value={this.state.password2}
                      onChange={this.onChange}
                    />
                    {errors.password2 && (
                      <div className="invalid-feedback">{errors.password2}</div>
                    )}
                  </div>
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// ???
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// PROPS < == > STATE OF STORE
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
  { registerUser }
)(withRouter(Register));
