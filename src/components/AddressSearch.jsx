import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import "./post.css";

const AddressSearch = () => {
  const [enroll_company, setEnroll_company] = useState({
    address: "",
  });

  const [popup, setPopup] = useState(false);

  // 주소 입력 수동 수정 시
  const handleInput = (e) => {
    setEnroll_company({
      ...enroll_company,
      [e.target.name]: e.target.value,
    });
  };

  // 버튼 클릭 시 Daum 주소창 열기
  const handleComplete = () => {
    setPopup(true);
  };

  // 모달 닫기
  const closePost = () => {
    setPopup(false);
  };

  // 주소 선택 완료 시 (DaumPostcode onComplete)
  const complete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== ""
            ? `, ${data.buildingName}`
            : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setEnroll_company({
      ...enroll_company,
      address: fullAddress,
    });

    // 완료 후 창 닫기
    closePost();
  };

  return (
    <div className="address_search">
      <label>주소</label>
      <input
        className="user_enroll_text"
        placeholder="주소"
        type="text"
        required
        name="address"
        onChange={handleInput}
        value={enroll_company.address}
      />
      <button type="button" onClick={handleComplete}>
        우편번호 찾기
      </button>

      {/* Daum 주소 검색창 모달 */}
      {popup && (
        <div className="post_wrapper">
          <div className="post_bg" onClick={closePost}></div>
          <div className="post_modal">
            <DaumPostcode
              className="postmodal"
              autoClose
              onComplete={complete}
            />
            <button className="close_btn" onClick={closePost}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSearch;
