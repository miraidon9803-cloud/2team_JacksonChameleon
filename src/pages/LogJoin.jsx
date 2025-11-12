import React from "react";
import { useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import { useAuthStore } from "../store/authStore";
import { useLogJoinStore } from "../store/LogJoinStore";
import "./scss/Logjoin.scss";

const LogJoin = () => {
  const navigate = useNavigate();
  const { onLogin, onGoogleLogin, onKakaoLogin, onMember } = useAuthStore();

  const {
    step, setStep,
    terms, toggleTerm, toggleDetail, handleAllTerms,
    isPostOpen, setIsPostOpen,
    formData, setFormData,
    handleComplete,
  } = useLogJoinStore();

  // 로그인 처리
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

  // 약관 다음단계
  const handleNextFromTerms = () => {
    if (terms.some((t) => t.required && !t.checked)) {
      alert("필수 약관에 동의해주세요.");
      return;
    }
    setStep("join");
  };

  // 회원가입 처리
  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }
    try {
      await onMember(formData);
      alert("회원가입 성공!");
      navigate("/");
    } catch (err) {
      alert("회원가입 실패: " + err.message);
    }
  };

  return (
    <div className={`logjoin-container step-${step}`}>
      {/*  로그인 */}
      {step === "login" && (
        <div className="login-wrap">
          <div className="left-login">
            <div className="left-login-wrap">
              <h2 className="section-title">LOGIN</h2>
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button type="submit">로그인</button>

                <div className="log-text">
                  <p>계정이 없으신가요?</p>
                  <button type="button" onClick={() => setStep("terms")}>
                    회원가입
                  </button>
                </div>

                <p className="log-web">SNS 간편로그인</p>
                <button type="button" onClick={onGoogleLogin} className="google">
                  구글 로그인
                </button>
                <button type="button" onClick={onKakaoLogin} className="kakao">
                  카카오 로그인
                </button>
              </form>
            </div>
          </div>
          <div className="right-login">
            <p className="login-message">
              Welcome back to <br /> a space of new harmony
            </p>
          </div>
        </div>
      )}

      {/*  약관 동의 */}
      {step === "terms" && (
        <div className="terms-wrap">
          <div className="left-side"></div>
          <div className="right-side">
            <h2 className="section-title">SIGN UP</h2>

            <div className="term-item all">
              <div className="term-header">
                <label>
                  <input
                    type="checkbox"
                    checked={terms.every((t) => t.checked)}
                    onChange={(e) => handleAllTerms(e.target.checked)}
                  />
                  전체 동의하기
                </label>
              </div>
            </div>

            {terms.map((term) => (
              <div key={term.id} className="term-item">
                <div className="term-header">
                  <label>
                    <input
                      type="checkbox"
                      checked={term.checked}
                      onChange={() => toggleTerm(term.id)}
                    />
                    [{term.required ? "필수" : "선택"}] {term.title}
                  </label>
                  <p className="term-toggle" onClick={() => toggleDetail(term.id)}>
                    {term.show ? "[접기]" : "[보기]"}
                  </p>
                </div>

                {term.show && (
                  <div className={`term-content ${term.show ? "open" : ""}`}>
                    {term.content}
                  </div>
                )}
              </div>
            ))}

            <button className="next-btn" onClick={handleNextFromTerms}>
              다음
            </button>
          </div>
        </div>
      )}

      {/* 회원가입 */}
      {step === "join" && (
        <div className="join-wrap">
          <div className="left-side"></div>
          <div className="right-side">
            <h2 className="section-title">SIGN UP</h2>
            <form onSubmit={handleJoinSubmit}>
              <div className="join-flex-wrap">
                <div className="left-inputs">
                  <div className="input-group">
                    <p>이메일주소</p>
                    <input
                      type="email"
                      name="email"
                      placeholder="이메일 주소"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="input-group">
                    <p>비밀번호</p>
                    <input
                      type="password"
                      name="password"
                      placeholder="비밀번호"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </div>

                  <div className="input-group">
                    <p>비밀번호 확인</p>
                    <input
                      type="password"
                      name="passwordConfirm"
                      placeholder="비밀번호 확인"
                      value={formData.passwordConfirm}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          passwordConfirm: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="input-group">
                    <p>휴대폰번호</p>
                    <input
                      type="text"
                      name="phone"
                      placeholder="휴대폰번호"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
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
                      value={formData.addnum}
                      readOnly
                    />
                    <button type="button" onClick={() => setIsPostOpen(true)}>
                      주소찾기
                    </button>
                  </div>
                  <input
                    type="text"
                    name="address"
                    placeholder="기본주소"
                    value={formData.address}
                    readOnly
                  />
                  <input
                    type="text"
                    name="add"
                    placeholder="상세주소"
                    value={formData.add}
                    onChange={(e) =>
                      setFormData({ ...formData, add: e.target.value })
                    }
                  />
                </div>
              </div>

              <button type="submit" className="join-btn">
                회원가입 완료
              </button>
            </form>
          </div>
        </div>
      )}


      {isPostOpen && (
        <div className="post_wrapper">
          <div
            className="post_bg"
            onClick={() => setIsPostOpen(false)}
          ></div>
          <div className="post_modal">
            <DaumPostcode onComplete={handleComplete} />
            <button onClick={() => setIsPostOpen(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>

  );
};

export default LogJoin;
