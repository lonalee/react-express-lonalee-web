import React, { Component } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      selectSkills: [
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
      myHistory: [
        {
          history: "",
          date: ""
        }
      ],
      achievements: [],
      userInput: "",
      userDate: ""
    };
  }

  selectMySkill = e => {
    console.dir(e.target);
    console.log(e.target.value);
  };

  onChange(e) {
    this.setState({
      userInput: e.target.value
    });
  }
  onClick(e) {
    this.setState({
      myHistory: [
        { history: this.state.userInput, date: this.state.userDate },
        ...this.state.myHistory
      ],
      userInput: "",
      userDate: ""
    });
  }

  changeDate(e) {
    console.log(e.target.value);
    this.setState({
      userDate: e.target.value
    });
  }

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
                  <h4>My history</h4>
                </label>
                <input
                  id="historyInput"
                  name="historyInput"
                  type="text"
                  className="history-input form-control"
                  onChange={this.onChange.bind(this)}
                  value={this.state.userInput}
                />
                {this.state.myHistory.map(history => (
                  <div key={history.history}>
                    {history.date && history.history}
                  </div>
                ))}
              </div>
              <div className="col">
                <label htmlFor="date" className="date">
                  <h4>When was it?</h4>
                </label>
                <input
                  id="date"
                  type="date"
                  className="date-input form-control"
                  onChange={this.changeDate.bind(this)}
                  value={this.state.userDate}
                />
                {this.state.myHistory.map(history => (
                  <div key={history.history}>
                    {history.date && history.date}
                  </div>
                ))}
              </div>
              <div className="click-icon" onClick={this.onClick.bind(this)}>
                <i
                  className="fas fa-user-check"
                  style={{
                    fontSize: "35px"
                  }}
                />
              </div>
            </div>
            <div
              className="form-group form-row"
              style={{ width: "100%", marginLeft: "1px" }}
            >
              <div className="col">
                <label htmlFor="">
                  <h4>Achievements</h4>
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.onChange.bind(this)}
                />
              </div>
              <div className="col">
                <label htmlFor="">
                  <h4>When was it?</h4>
                </label>
                <input
                  className="form-control date-input"
                  type="date"
                  onChange={this.onChange.bind(this)}
                />
              </div>

              <div className="click-icon" onClick={this.onClick.bind(this)}>
                <i
                  className="fas fa-user-check"
                  style={{
                    fontSize: "35px"
                  }}
                />
              </div>
            </div>
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
              <div className="click-icon" onClick={this.onClick.bind(this)}>
                <i
                  className="fas fa-user-check"
                  style={{
                    fontSize: "35px"
                  }}
                />
              </div>
            </div>
            <div className="selectedSkills">
              <ul className="skills">
                <li />
              </ul>
            </div>
            <button>SAVE</button>
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

export default Profile;
