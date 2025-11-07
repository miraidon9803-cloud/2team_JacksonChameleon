import React from 'react'
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const { onLogout } = useAuthStore();
  const navigate = useNavigate();

  // 2. 메서드
  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div>
      <button onClick={handleLogout}>
        <span>로그아웃</span>
      </button>
    </div>
  );
};

export default MyPage;