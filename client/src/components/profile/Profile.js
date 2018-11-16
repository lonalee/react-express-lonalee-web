import React, { Component } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

class Profile extends Component {
  render() {
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
