import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { useLogJoinStore } from "../store/LogJoinStore";
import "./scss/post.scss";

const Join = () => {
  const { toggleForm } = useLogJoinStore(); // ✅ Zustand 상태 불러오기

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
  });

  const [isPostOpen, setIsPostOpen] = useState(false); // 주소창 열림 여부

  // 회원가입 제출 시
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("회원가입 데이터:", formData);
    alert("회원가입 완료!");
    toggleForm(); // ✅ 회원가입 후 로그인 폼으로 전환
  };

  // input값 변경 시
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 주소 검색 버튼 클릭 시
  const handleAddressSearch = (e) => {
    e.preventDefault();
    setIsPostOpen(true);
  };

  // 다음 주소 검색 완료 시
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") extraAddress += data.bname;
      if (data.buildingName !== "")
        extraAddress += extraAddress
          ? `, ${data.buildingName}`
          : data.buildingName;
      fullAddress += extraAddress ? ` (${extraAddress})` : "";
    }

    setFormData({ ...formData, address: fullAddress });
    setIsPostOpen(false);
  };

  return (
    <div className="sub-page">
      <div className="inner">
        <div className="login-wrap">
          <h2 className="section-title">회원가입</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="name"
              placeholder="이름"
              value={formData.name}
              onChange={handleChange}
              required
            />

            {/* 주소 입력칸 + 버튼 */}
            <div className="address-box">
              <input
                type="text"
                name="address"
                placeholder="주소"
                value={formData.address}
                onChange={handleChange}
                readOnly
              />
              <button onClick={handleAddressSearch}>주소찾기</button>
            </div>

            <input
              type="text"
              name="phone"
              placeholder="전화번호"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <button type="submit">회원가입</button>
          </form>

          {/* ✅ 로그인으로 돌아가기 버튼 */}
          <div className="log-text">
            <p>이미 계정이 있으신가요?</p>
            <button type="button" onClick={toggleForm}>
              로그인으로 돌아가기
            </button>
          </div>
        </div>
      </div>

      {/* Daum 우편번호 검색 모달 */}
      {isPostOpen && (
        <div className="post_wrapper">
          <div
            className="post_bg"
            onClick={() => setIsPostOpen(false)}
          ></div>
          <div className="post_modal">
            <DaumPostcode
              className="postmodal"
              autoClose
              onComplete={handleComplete}
            />
            <button
              className="close_btn"
              onClick={() => setIsPostOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Join;
