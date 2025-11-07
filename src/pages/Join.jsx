import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { useLogJoinStore } from "../store/LogJoinStore";
import "./scss/post.scss";
import "./scss/join.scss";

const Join = () => {
  const { toggleForm } = useLogJoinStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "", // 비밀번호 확인 추가
    addnum: "",
    address: "",
    phone: "",
  });

  const [isPostOpen, setIsPostOpen] = useState(false); // 주소창 열림 여부

  // input값 변경 시
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 회원가입 제출 시
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    console.log("회원가입 데이터:", formData);
    alert("회원가입 완료!");
    toggleForm();
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
        
        

        <h2 className="section-title">SIGN UP</h2>
        <form onSubmit={handleSubmit}>
          <div className="join-wrap">
            <div className="join-right">

              

              <p>이메일 주소</p>
              <input
                type="email"
                name="email"
                placeholder="이메일 주소를 입력해주세요"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <p>비밀번호</p>
              <input
                type="password"
                name="password"
                placeholder="영어,숫자,특수문자 조합 8~16자리"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <p>비밀번호 확인</p>
              <input
                type="password"
                name="passwordConfirm"
                placeholder="비밀번호를 다시  입력해주세요"
                value={formData.passwordConfirm}
                onChange={handleChange}
                required
              />

              <p>휴대폰 번호</p>
              <input
                type="text"
                name="phone"
                placeholder="- 없이 숫자만 입력해주세요"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* 주소 입력칸 + 버튼 */}
            <div className="address-box">
             
                <p>주소</p>
                 <div className="addressnum">
                <input type="text"
                  name="addressnum"
                  placeholder="우편번호"
                  value={formData.addnum}
                  onChange={handleChange}
                  required
                />
                <button type="button" onClick={handleAddressSearch}>
                  주소찾기
                </button>
              </div>
              <input
                type="text"
                name="address"
                placeholder="주소"
                value={formData.address}
                onChange={handleChange}
                readOnly
              />

              <input type="text"
                name="add"
                placeholder="나머지주소"
              />


            </div>
          </div>

          <button className="join-btn" type="submit">회원가입</button>
        </form>

        <div className="log-text">
          <p>이미 계정이 있으신가요?</p>
          <button type="button" onClick={toggleForm}>
            로그인으로 돌아가기
          </button>
        </div>

      </div>

      {/* Daum 우편번호 검색 모달 */}
      {isPostOpen && (
        <div className="post_wrapper">
          <div className="post_bg" onClick={() => setIsPostOpen(false)}></div>
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
