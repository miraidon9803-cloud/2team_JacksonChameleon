import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import { useAuthStore } from "../store/authStore";
import { useLogJoinStore } from "../store/LogJoinStore";
import "./scss/Logjoin1.scss";

export default function LogJoin() {
  const navigate = useNavigate();
  const { onLogin, onGoogleLogin, onKakaoLogin, onMember } = useAuthStore();

  const {
    terms,
    toggleTerm,
    handleAllTerms,
    toggleDetail,
    loginForm,
    setLoginForm,
    resetLoginForm,
    joinForm,
    setJoinForm,
    resetJoinForm,
    isPostOpen,
    setIsPostOpen,
    handleComplete,
  } = useLogJoinStore();

  const [panel, setPanel] = useState("login");
  const [showJoinForm, setShowJoinForm] = useState(false);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleJoinChange = (e) => {
    const { name, value } = e.target;
    setJoinForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await onLogin(loginForm.email, loginForm.password);
      alert("로그인 성공!");
      navigate("/mypage");
      resetLoginForm();
    } catch (err) {
      alert("로그인 실패: " + err.message);
    }
  };

  const openTermsPanel = () => {
    resetJoinForm();
    setPanel("terms");
  };

  const handleNextFromTerms = () => {
    if (terms.some((t) => t.required && !t.checked)) {
      alert("필수 약관에 동의해주세요.");
      return;
    }
    setShowJoinForm(true);
  };

  const handleJoinSubmit = async (e) => {
    e.preventDefault();

    if (joinForm.password !== joinForm.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }
    try {
      await onMember(joinForm);
      console.log("회원가입 성공!");

      resetJoinForm();
      setShowJoinForm(false);
      // setPanel("login");
      setJoinComplete(true);
    } catch (err) {
      alert("회원가입 실패: " + err.message);
    }
  };
  const [joinComplete, setJoinComplete] = useState(false);

  const goLogin = () => {
    setJoinComplete(false);
    setShowJoinForm(false);
    setPanel("login");
  };

  const cardClass =
    panel === "terms" ? "glass-card terms-active" : "glass-card";

  return (
    <div className="logjoin-container">
      <div className={cardClass}>
        <div className="slider-wrapper">
          {/* 로그인 */}
          <div className="login-area">
            <div className="login-box">
              <h2>LOGIN</h2>
              <form onSubmit={handleLogin}>
                <div className="input-wrap">
                  <img src="/images/email.svg" alt="email" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <div className="input-wrap">
                  <img src="/images/lyra-icon-lock.svg" alt="password" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <button type="submit" className="login-btn">
                  로그인
                </button>
              </form>

              <p className="signup-text">
                계정이 없으신가요?{" "}
                <span onClick={openTermsPanel}>회원가입</span>
              </p>

              <div className="social-login">
                <div className="text-box">
                  <img src="/images/line.svg" alt="line" />
                  <h2>SNS 간편로그인</h2>
                  <img src="/images/line.svg" alt="line" />
                </div>

                <button
                  type="button"
                  onClick={onGoogleLogin}
                  className="btn google"
                >
                  <img src="/images/google.svg" alt="google" />
                  <p>구글 로그인</p>
                </button>
                <button
                  type="button"
                  onClick={onKakaoLogin}
                  className="btn kakao"
                >
                  <img src="/images/kakao.svg" alt="kakao" />
                  <p>카카오 로그인</p>
                </button>
              </div>
            </div>
          </div>

          {/* 이미지 */}
          <div className={`image-area ${joinComplete ? "hide" : ""}`}>
            <img src="/images/log-img2.png" alt="login visual" />
            <div className="text-overlay">
              <p>
                Welcome back to <br />a space of new harmony
              </p>
            </div>
          </div>

          {/* 약관 회원가입 */}
          <div className={`term-join-area ${joinComplete ? "hide" : ""}`}>
            <div className={`terms-wrap ${panel === "terms" ? "show" : ""}}`}>
              <div className={`right-side ${showJoinForm ? "show-join" : ""}`}>
                {/* 약관 */}
                <div className="terms-content">
                  <div className="title-wrap">
                    <p className="nav-btn" onClick={() => setPanel("login")}>
                      <img src="/images/log-arrow-left.png" alt="" />
                    </p>
                    <h2 className="section-title">SIGN UP</h2>
                    <p className="nav-btn" onClick={handleNextFromTerms}>
                      <img src="/images/log-arrow-right.png" alt="" />
                    </p>
                  </div>

                  <div className="terms-box">
                    <p>이용약관동의</p>

                    <div className="term-wrap1">
                      <label className="check-box">
                        <input
                          type="checkbox"
                          checked={terms.every((t) => t.checked)}
                          onChange={(e) => handleAllTerms(e.target.checked)}
                          className="real"
                        />
                        <span className="fake">
                          <img
                            className="icon"
                            src="/images/check.png"
                            alt="checkicon"
                          />
                        </span>
                        전체 동의하기
                      </label>
                    </div>

                    {terms.map((term) => (
                      <div key={term.id} className="term-item2">
                        <div className="term-header">
                          <label className="check-box">
                            <input
                              type="checkbox"
                              checked={term.checked}
                              onChange={() => toggleTerm(term.id)}
                              className="real"
                            />
                            <span className="fake">
                              <img
                                className="icon"
                                src="/images/check.png"
                                alt="checkicon"
                              />
                            </span>
                            [{term.required ? "필수" : "선택"}] {term.title}
                          </label>
                          <p
                            className="term-toggle"
                            onClick={() => toggleDetail(term.id)}
                          >
                            {term.show ? "[접기]" : "[보기]"}
                          </p>
                        </div>

                        {term.show && (
                          <div className="term-content">{term.content}</div>
                        )}
                      </div>
                    ))}
                  </div>

                  <button className="next-btn" onClick={handleNextFromTerms}>
                    다음
                  </button>
                </div>

                {/* 회원가입 */}
                <div className="join-form">
                  <div className="join-wrap">
                    <div className="right-side">
                      <div className="title-wrap">
                        <p
                          className="nav-btn"
                          onClick={() => setShowJoinForm(false)}
                        >
                          <img src="/images/log-arrow-left.png" alt="" />
                        </p>

                        <h2 className="section-title">SIGN UP</h2>
                        <p className="nav-btns" onClick={handleNextFromTerms}>
                          <img src="/images/log-arrow-right.png" alt="" />
                        </p>
                      </div>

                      <form onSubmit={handleJoinSubmit}>
                        <div className="join-flex-wrap">
                          <div className="left-inputs">
                            <div className="input-group">
                              <p>성함</p>
                              <input
                                type="name"
                                name="name"
                                value={joinForm.name}
                                onChange={handleJoinChange}
                                placeholder="성함을 입력해주세요"
                                required
                              />
                            </div>

                            <div className="input-group">
                              <p>이메일 주소</p>
                              <input
                                type="email"
                                name="email"
                                value={joinForm.email}
                                onChange={handleJoinChange}
                                placeholder="이메일 주소를 입력해주세요"
                                required
                              />
                            </div>

                            <div className="input-group">
                              <p>비밀번호</p>
                              <input
                                type="password"
                                name="password"
                                value={joinForm.password}
                                onChange={handleJoinChange}
                                placeholder="영어,숫자,특수문자 조합 8~16자리"
                                required
                              />
                            </div>

                            <div className="input-group">
                              <p>비밀번호 확인</p>
                              <input
                                type="password"
                                name="passwordConfirm"
                                value={joinForm.passwordConfirm}
                                onChange={handleJoinChange}
                                placeholder="비밀번호를 다시 입력해주세요"
                                required
                              />
                            </div>

                            <div className="input-group">
                              <p>휴대폰번호</p>
                              <input
                                type="text"
                                name="phone"
                                value={joinForm.phone}
                                onChange={handleJoinChange}
                                placeholder="- 없이 숫자만 입력해주세요"
                              />
                            </div>
                          </div>

                          <div className="right-address">
                            <p>주소</p>
                            <div className="address-btn">
                              <input
                                type="text"
                                name="addnum"
                                placeholder="우편번호"
                                value={joinForm.addnum}
                                readOnly
                              />
                              <button
                                type="button"
                                onClick={() => setIsPostOpen(true)}
                              >
                                주소찾기
                              </button>
                            </div>

                            <input
                              type="text"
                              name="address"
                              placeholder="기본주소"
                              value={joinForm.address}
                              readOnly
                            />

                            <input
                              type="text"
                              name="add"
                              placeholder="상세주소"
                              value={joinForm.add}
                              onChange={handleJoinChange}
                            />
                          </div>
                        </div>

                        <button type="submit" className="join-btn">
                          회원가입 완료
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`join-complete ${joinComplete ? "show" : ""}`}>
            <div className="complete-wrap">
              <p>JOIN US</p>
              <img className="bounce" src="/images/logincomplete.png" alt="" />
              <p>회원가입 완료</p>
              <p>
                잭슨카멜레온의 회원이 되신것을 환영합니다 <br />
                로그인후 서비스를 이용해주시기 바랍니다.
              </p>
              <button onClick={goLogin}>로그인 하러가기</button>
            </div>
          </div>
        </div>
      </div>

      {/* 주소검색 */}
      {isPostOpen && (
        <div className="post_wrapper">
          <div className="post_bg" onClick={() => setIsPostOpen(false)} />
          <div className="post_modal">
            <DaumPostcode onComplete={handleComplete} />
            <button onClick={() => setIsPostOpen(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
