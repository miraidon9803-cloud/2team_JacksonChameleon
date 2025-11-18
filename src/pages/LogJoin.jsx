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
    formData,
    setFormData,
    isPostOpen,
    setIsPostOpen,
    handleComplete,
  } = useLogJoinStore();

  const [panel, setPanel] = useState("login");
  const [showJoinForm, setShowJoinForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await onLogin(formData.email, formData.password);
      alert("로그인 성공!");
      navigate("/mypage");
    } catch (err) {
      alert("로그인 실패: " + err.message);
    }
  };

  const openTermsPanel = () => setPanel("terms");

  const handleNextFromTerms = () => {
    if (terms.some((t) => t.required && !t.checked)) {
      alert("필수 약관에 동의해주세요.");
      return;
    }
    setShowJoinForm(true);
  };

  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }
    try {
      await onMember(formData);
      alert("회원가입 성공!");
      setShowJoinForm(false);
      setPanel("login");
    } catch (err) {
      alert("회원가입 실패: " + err.message);
    }
  };

  const cardClass =
    panel === "terms" ? "glass-card terms-active" : "glass-card";

  return (
    <div className="logjoin-container">
      <div className={cardClass}>
        <div className="slider-wrapper">
          {/* ---------------- 로그인 ---------------- */}
          <div className="login-area">
            <div className="login-box">
              <h2>LOGIN</h2>
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password || ""}
                  onChange={handleChange}
                  required
                />
                <button type="submit" className="login-btn">
                  로그인
                </button>
              </form>


              <p className="signup-text">
                계정이 없으신가요?{" "}
                <span onClick={openTermsPanel}>회원가입</span>
              </p>

              <div className="social-login">
                <p>SNS 간편로그인</p>
                <button type="button" onClick={onGoogleLogin} className="btn google">
                  구글 로그인
                </button>
                <button type="button" onClick={onKakaoLogin} className="btn kakao">
                  카카오 로그인
                </button>
              </div>

            </div>
          </div>

          {/* ---------------- 이미지 ---------------- */}
          <div className="image-area">
            <img src="/images/log-img2.png" alt="login visual" />
            <div className="text-overlay">
              <p>Welcome back to <br />a space of new harmony</p>
            </div>
          </div>

          {/* ---------------- 약관 & 회원가입 (같은 패널 내부 fade) ---------------- */}
          <div className="term-join-area">
            <div className={`terms-wrap ${panel === "terms" ? "show" : ""}`}>
              <div className={`right-side ${showJoinForm ? "show-join" : ""}`}>
                {/* 약관 */}
                <div className="terms-content">
                  <h2 className="section-title">SIGN UP</h2>
                  <div className="terms-box">
                     <p>이용약관동의</p>
                    
                    <div className="term-wrap1">
                         <label>
                        <input
                          type="checkbox"
                          checked={terms.every((t) => t.checked)}
                          onChange={(e) => handleAllTerms(e.target.checked)}
                        />
                        전체 동의하기
                      </label>
                      </div>
                    {terms.map((term) => (
                      <div key={term.id} className="term-item2">
                        <div className="term-header">
                          <label>
                            <input
                              type="checkbox"
                              checked={term.checked}
                              onChange={() => toggleTerm(term.id)}
                            />
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
                      <h2 className="section-title">SIGN UP</h2>
                      <form onSubmit={handleJoinSubmit}>
                        <div className="join-flex-wrap">
                          <div className="left-inputs">
                            <div className="input-group">
                              <p>이메일 주소</p>
                              <input
                                type="email"
                                name="email"
                                value={formData.email || ""}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="input-group">
                              <p>비밀번호</p>
                              <input
                                type="password"
                                name="password"
                                value={formData.password || ""}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="input-group">
                              <p>비밀번호 확인</p>
                              <input
                                type="password"
                                name="passwordConfirm"
                                value={formData.passwordConfirm || ""}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="input-group">
                              <p>휴대폰번호</p>
                              <input
                                type="text"
                                name="phone"
                                value={formData.phone || ""}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="right-address">
                            
                            <div className="address-btn">
                              <p>주소</p>
                              <input
                                type="text"
                                name="addnum"
                                placeholder="우편번호"
                                value={formData.addnum || ""}
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
                              value={formData.address || ""}
                              readOnly
                            />
                            <input
                              type="text"
                              name="add"
                              placeholder="상세주소"
                              value={formData.add || ""}
                              onChange={handleChange}
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
        </div>
      </div>

      {/* 주소검색 모달 */}
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
