import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Link, useNavigate } from 'react-router-dom';
import "./scss/Mypage.scss";
import { useLogJoinStore } from '../store/LogJoinStore';
import DaumPostcode from "react-daum-postcode";


const MyPage = () => {
  const { user, onLogout } = useAuthStore();
  const {isPostOpen, setIsPostOpen, formData, setFormData,handleComplete} = useLogJoinStore();
  const navigate = useNavigate();
  


  const [activeTab, setActiveTab] = useState(0);

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className='maypage-wrap'>
      <div className="inner-wrap">
        <div className="inner">

          <h2>My Page</h2>

    
          <div className="name-box box-style">
            <p>{user?.email} 님, 안녕하세요</p>
            <button onClick={handleLogout}><span>로그아웃</span></button>
          </div>

          <div className="bottom-box">

      
            <div className="left-box">

              <div className="level-box box-style">
                <div className="box box1">
                  <h3>회원등급</h3>
                  <div className="level">
                    <img src="/images/level.png" alt="level" />
                    <p>일반회원</p>
                  </div>
                  <p>다음 등급까지 1,000포인트 남았습니다.</p>
                  <div className='gauge'>gauge</div>
                </div>

                <div className="box box2">
                  <h3>적립금</h3>
                  <p>1,000</p>
                </div>

                <div className="box box3">
                  <h3>보유쿠폰</h3>
                  <p>2</p>
                </div>
              </div>

              <div className="cs-box box-style">
                <h3>고객센터</h3>
                <div className="cs-menu">
                  <div><Link><img src="/images/sc-chat-icon.png" alt="sc-chat" />1:1문의</Link></div>
                  <div><Link><img src="/images/notice-icon.png" alt="notice" />공지사항</Link></div>
                </div>
              </div>

            </div>

    
            <div className="right-box">

            
              <div className="deliver-box box-style">
                <h3>최근 주문 내역</h3>
                <div className="Sequence-wrap">
                  <div className="Sequence active"><p>1</p><p>주문접수</p></div>
                  <img src="/images/mypage-Arrow.png" alt="arrow" />
                  <div className="Sequence"><p>0</p><p>배송준비중</p></div>
                  <img src="/images/mypage-Arrow.png" alt="arrow" />
                  <div className="Sequence"><p>0</p><p>배송중</p></div>
                  <img src="/images/mypage-Arrow.png" alt="arrow" />
                  <div className="Sequence active"><p>3</p><p>배송완료</p></div>
                  <div className="line">line</div>
                  <div className="Sequence"><p>0</p><p>취소/반품/교환</p></div>
                </div>
              </div>

             
              <div className="info-box box-style">
                <h3>나의 정보관리</h3>

                <ul className='info-menu'>
                  <li 
                    className={activeTab === 0 ? "active" : ""} 
                    onClick={() => setActiveTab(0)}
                  >
                    회원정보 수정 <span>●</span>
                  </li>

                  <li 
                    className={activeTab === 1 ? "active" : ""} 
                    onClick={() => setActiveTab(1)}
                  >
                    배송 주소록 관리 <span>●</span>
                  </li>

                  <li 
                    className={activeTab === 2 ? "active" : ""} 
                    onClick={() => setActiveTab(2)}
                  >
                    게시물 관리 <span>●</span>
                  </li>
                </ul>

 
                <div className={`tab tab1 ${activeTab === 0 ? "active" : ""}`}>
                  <div className="input-wrap">
                    <div className="input">
                      <p>이메일 주소</p>
                      <input type="email" placeholder='abcd@naver.com' />
                    </div>
                    <div className="input">
                      <p>비밀번호</p>
                      <input type="password" placeholder='********' />
                    </div>
                    <div className="input">
                      <p>비밀번호 확인</p>
                      <input type="password" placeholder='********' />
                    </div>
                    <div className="input">
                      <p>휴대폰번호</p>
                      <input type="text" placeholder='010-1234-5678' />
                    </div>

                    <button className='del-btn'>탈퇴하기</button>
                  </div>

                  <button className='change-btn'>회원정보 수정</button>
                </div>


                <div className={`tab tab2 ${activeTab === 1 ? "active" : ""}`}>
                  <div className="input-wrap">
                    <p>주소</p>
                    <div className="input12">
                      <div className="addnum-box">
                        <input type="text" placeholder='우편번호'
                        value={formData.addnum} 
                        readOnly/>
                        <button onClick={()=>setIsPostOpen(true)}>주소찾기</button>
                      </div>
                      <input type="text" placeholder='기본주소' value={formData.address}/>
                      <input type="text" placeholder='상세주소' value={formData.add}
                      onChange={(e)=>setFormData({...formData, add:e.target.value})} />
                    </div>
                  </div>

                  <button className='change-btn'>배송정보 수정</button>
                </div>

          
                <div className={`tab tab3 ${activeTab === 2 ? "active" : ""}`}>
                  <div className="input-wrap">
                    <div className="input">
                      <p>작성 가능한 리뷰</p>
                      <ul><li>없음</li></ul>
                    </div>
                    <div className="input">
                      <p>작성한 리뷰</p>
                      <ul><li>없음</li></ul>
                    </div>
                  </div>

                  <button className='change-btn'>게시물 수정</button>
                </div>

              </div>
            </div>

          </div>
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
        </div>
      </div>
   
  );
};

export default MyPage;
