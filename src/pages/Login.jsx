import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useLogJoinStore } from '../store/LogJoinStore';
import './scss/login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin, onGoogleLogin, onKakaoLogin } = useAuthStore();
  const navigate = useNavigate();
  const { toggleForm } = useLogJoinStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onLogin(email, password);
    navigate('/mypage');
  };

  // 구글 로그인
  const handleGoogleLogin = async () => {
    await onGoogleLogin();
    console.log('구글');
    navigate('/mypage');
  };

  // 카카오 로그인
  const handleKakaoLogin = async () => {
    await onKakaoLogin();
    console.log('카카오');
    navigate('/mypage');
  };

  return (
    <div className="sub-page">
      <div className="inner">
        <div className="login-wrap">
          <div className="right-login">
            <div className="right-login-wrap">
              <h2 className="section-title">LOGIN</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)
                    
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">로그인</button>

                <div className="log-text">
                  <p>계정이 없으신가요?</p>
                  <button type="button" onClick={toggleForm}>
                    회원가입
                  </button>
                </div>

                <p className="log-web">SNS 간편로그인</p>

           
                <button type="button" onClick={handleGoogleLogin} className="google">
                  구글 로그인
                </button>
                <button type="button" onClick={handleKakaoLogin} className="kakao">
                  카카오 로그인
                </button>
              </form>
            </div>
          </div>

          <div className="login-left">
            <p>
              Welcome back to
              <br />
              a space of new harmony
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
