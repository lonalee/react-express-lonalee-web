import React, { Component } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import { Table } from "reactstrap";

import { setCurrentProfile, saveMyPofile } from "../../action/myProfileActions";
import { connect } from "react-redux";

import uuid from "uuid";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      selectSkills: [
        "-",
        "HTML",
        "CSS",
        "JavaScript",
        "Angular",
        "React",
        "Vue",
        "Express",
        "MongoDB",
        "Mongoose"
      ],
      selected: [],
      // myHistory: [
      //   {
      //     id: uuid(),
      //     history: "",
      //     date: ""
      //   }
      // ],
      historyNo: 0,
      achievementNo: 0,
      skillsNo: 0,
      historyTouched: false,
      achievementsTouched: false,
      // myAchievements: [
      //   {
      //     id: uuid(),
      //     achievements: "",
      //     achievementDate: ""
      //   }
      // ],
      userInput: "",
      achievementsInput: "",
      historyInput: "",
      historyDateInput: "",
      achievementsDateInput: ""
    };
  }
  componentDidMount() {
    console.log("this.props", this.props);
  }
  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
  }

  selectMySkill = e => {
    const currentData = {
      no: this.state.skillsNo + 1,
      id: uuid(),
      ref: "mySkills",
      skill: e.target.value
    };
    this.setState(state => ({
      ...state,
      skillsNo: state.skillsNo + 1
    }));
    this.props.setCurrentProfile(currentData);
  };

  onChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }
  onClick(e) {
    if (e.target.className === "myHistory") {
      const currentData = {
        no: this.state.historyNo + 1,
        id: uuid(),
        ref: "myHistory",
        history: this.state.historyInput,
        historyDate: this.state.historyDateInput
      };
      this.setState(state => ({
        ...state,
        historyNo: state.historyNo + 1,
        historyInput: "",
        historyDateInput: ""
      }));
      this.props.setCurrentProfile(currentData);
    } else if (e.target.className === "myAchievements") {
      const currentData = {
        no: this.state.achievementNo + 1,
        id: uuid(),
        ref: "myAchievements",
        achievement: this.state.achievementsInput,
        achievementDate: this.state.achievementsDateInput
      };
      this.setState(state => ({
        ...state,
        achievementNo: state.achievementNo + 1,
        achievementsInput: "",
        achievementsDateInput: ""
      }));
      this.props.setCurrentProfile(currentData);
    }
  }

  changeDate(e) {
    this.setState({
      historyDateInput: e.target.value
    });
  }
  saveMyPofile = e => {
    const userId = this.props.user.user.id;
    this.props.saveMyPofile({ userId: userId, ...this.props.myProfile });
    e.preventDefault();
  };
  render() {
    const selectSkills = this.state.selectSkills;
    return (
      <div>
        <Navbar />
        <aside id="aside-scroll" className="aside">
          <ul className="aside-list">
            <span>Contents</span>
            <li>
              <a className="aside-item" href="#about-Me">
                about Me
              </a>
            </li>
            <li>
              <a className="aside-item" href="#Skill-Set">
                Skill Set
              </a>
            </li>
            <li>
              <a className="aside-item" href="#Achievements">
                Achievements
              </a>
            </li>
            <li>
              <a className="aside-item" href="#Repo">
                Repo
              </a>
            </li>
            <li>
              <a className="aside-item" href="#ETC">
                ETC
              </a>
            </li>
          </ul>
        </aside>
        <div className="form-container" style={{ marginTop: "100px" }}>
          <form onSubmit={this.onSubmit}>
            <div
              className="form-group form-row"
              style={{ width: "100%", marginLeft: "1px" }}
            >
              <div className="col">
                <label htmlFor="historyInput" className="history">
                  <h4>학력 및 경력</h4>
                </label>
                <input
                  id="historyInput"
                  name="historyInput"
                  type="text"
                  className="history-input form-control"
                  onChange={this.onChange.bind(this)}
                  value={this.state.historyInput}
                />
              </div>
              <div className="col">
                <label htmlFor="date" className="date">
                  <h4>기간</h4>
                </label>
                <input
                  id="date"
                  placeholder="입력 예 : YY-MM-DD ~ YY-MM-DD"
                  name="historyDateInput"
                  className="date-input form-control"
                  onChange={this.changeDate.bind(this)}
                  value={this.state.historyDateInput}
                />
              </div>
              <div className="click-icon">
                <div
                  className="myHistory"
                  style={{
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    zIndex: "2"
                  }}
                  onClick={this.onClick.bind(this)}
                />
                <i
                  className="fas fa-user-check"
                  style={{
                    fontSize: "35px",
                    position: "absolute",
                    zIndex: "1",
                    marginLeft: "10px"
                  }}
                />
              </div>
            </div>
            {this.props.myProfile.myHistory.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>history</th>
                    <th>period</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.myProfile.myHistory.map(history => (
                    <tr key={history.id}>
                      <th key={history.no}>{history.no}</th>
                      <td key={history.history}>{history.history}</td>
                      <td key={history.historyDate}>{history.historyDate}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <div
              className="form-group form-row"
              style={{ width: "100%", marginLeft: "1px" }}
            >
              <div className="col">
                <label htmlFor="">
                  <h4>업적</h4>
                </label>
                <input
                  type="text"
                  name="achievementsInput"
                  className="form-control"
                  onChange={this.onChange.bind(this)}
                  value={this.state.achievementsInput}
                />
              </div>
              <div className="col">
                <label htmlFor="">
                  <h4>기간</h4>
                </label>
                <input
                  name="achievementsDateInput"
                  className="form-control date-input"
                  placeholder="입력 예 : YY-MM-DD ~ YY-MM-DD"
                  onChange={this.onChange.bind(this)}
                  value={this.state.achievementsDateInput}
                />
              </div>
              <div className="click-icon">
                <div
                  className="myAchievements"
                  style={{
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    zIndex: "2"
                  }}
                  onClick={this.onClick.bind(this)}
                />
                <i
                  className="fas fa-user-check"
                  style={{
                    fontSize: "35px",
                    position: "absolute",
                    zIndex: "1",
                    marginLeft: "10px"
                  }}
                />
              </div>
            </div>
            {this.props.myProfile.myAchievements.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>achievements</th>
                    <th>period</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.myProfile.myAchievements.map(achievements => (
                    <tr key={achievements.id}>
                      <th key={achievements.no}>{achievements.no}</th>
                      <td key={achievements.achievement}>
                        {achievements.achievement}
                      </td>
                      <td key={achievements.achievementDate}>
                        {achievements.achievementDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <div className="form-group">
              <label htmlFor="skill-set" className="skill-set">
                <h4>Skill Set</h4>
              </label>
              <select
                name="skill-set"
                id="skill-set"
                className="form-control skill-set"
                onChange={this.selectMySkill}
                style={{
                  width: "75%",
                  marginLeft: "6px"
                }}
              >
                {selectSkills.map(skill => (
                  <option key={skill}>{skill}</option>
                ))}
              </select>
              <div className="click-icon">
                <div
                  className="mySkills"
                  style={{
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    zIndex: "2"
                  }}
                  onClick={this.onClick.bind(this)}
                />
                <i
                  className="fas fa-user-check"
                  style={{
                    fontSize: "35px",
                    position: "absolute",
                    zIndex: "1",
                    marginLeft: "10px"
                  }}
                />
              </div>
              {this.props.myProfile.mySkills.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>skills</th>
                      <th>level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.myProfile.mySkills.map(Skills => (
                      <tr key={Skills.id}>
                        <th key={Skills.no}>{Skills.no}</th>
                        <td key={Skills.skill}>{Skills.skill}</td>
                        <td key={Skills.level}>{Skills.level}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
            <div className="selectedSkills">
              <ul className="skills">
                <li />
              </ul>
            </div>
            <button onClick={this.saveMyPofile}>SAVE</button>
          </form>
        </div>
        <div className="section-container">
          <section className="section-1">
            <h2 id="about-Me">1. about Me?</h2>
            <ul className="my-history">
              <li>패스트캠퍼스 프론트엔드 스쿨 수료(2018. 5 ~ 8)</li>
              <li>한국항공대학교 경영학 학사 (2013.)</li>
              <li>SK인포섹 정보보안컨설팅 본부 재직 중 (2012 ~ 현재)</li>
              <li>캐나다 어학연수 10개월 (2009.)</li>
              <li>모의해킹 전문가 양성 과정 수료 (2008.)</li>
            </ul>
          </section>
          <section>
            <h2 id="Skill-Set">2. Skill set</h2>
            <ul className="skill-set">
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>Angular</li>
              <li>React</li>
            </ul>
          </section>
          <section>
            <h2 id="Achievements">3. Achievements</h2>
            <ul className="achievement">
              <li>프론트엔드 개발 관련 이론 정리 블로그 운영 중(Jekyll)</li>
              <li>개인 PJT 수행 (MERN stack)</li>
              <li>패스트캠퍼스 PJT 수행 (배민찬 홈페이지 COPY)</li>
              <li>TOEIC 905점 취득 (2014. 8.)</li>
              <li>정보처리기사 취득</li>
            </ul>
          </section>
          <section>
            <h2 id="Repo">4. Repo</h2>
            <ul className="repo">
              <li>
                <a href="https://github.com/lonalee/react-express-lonalee-web">
                  react-express-lonalee-web
                </a>
              </li>
              <li>
                <a href="https://github.com/lonalee/lonalee.github.io">
                  lonalee.github.io
                </a>
              </li>

              <li />
            </ul>
          </section>
          <section>
            <h2 id="ETC">5. ETC</h2>
            <p />
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapPropsToState = state => ({
  myProfile: state.myProfile,
  user: state.auth
});

export default connect(
  mapPropsToState,
  { setCurrentProfile, saveMyPofile }
)(Profile);
