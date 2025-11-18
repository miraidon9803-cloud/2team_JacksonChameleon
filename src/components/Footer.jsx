import React from 'react'
import './scss/Footer.scss'

const Footer = () => {
  return (
    <footer>
      <div className="footer-wrap">
        <div className="inner footer-inner">

          <div className="footer-top">

            <div className="footer-left">
              <h1 className='logo'><img src="./images/logo.png" alt="footer-logo" /></h1>
              <div className="icon-wrap">
                <p><img src="./images/icon-facebook.png" alt="facebook" /></p>
                <p><img src="./images/icon-insta.png" alt="instagram" /></p>
                <p><img src="./images/icon-x.png" alt="x" /></p>
                <p><img src="./images/icon-youtube.png" alt="youtube" /></p>
              </div>
            </div>

            <div className="footer-right">
              <div className="show-room">
                <div className="text-box">
                  <p className='footer-title'>SHOW ROOM</p>
                  <div className="room-text">
                    <p><strong>연희점</strong> 서울 서대문구 연희로 11가길 42</p>
                    <p><strong>판교점</strong> 경기 성남시 분당구 판교역로 146번길 20</p>
                    <p><strong>무브먼트랩</strong> 전국 지점</p>
                  </div>
                </div>
                <button className='room-btn'>매장 안내 바로가기</button>
              </div>

              <div className="customer-center">
                <div className="text-box">
                  <p className='footer-title'>CUSTOMER CENTER</p>
                  <div className="customer-text">
                    <p className='call'>1855-2014</p>
                    <p>평일 10:00 - 18:00 (점심시간 12:00 - 13:00)</p>
                    <p className='day'>(*주말, 공휴일 휴무)</p>
                  </div>
                </div>
                <button className='online-btn'>온라인 문의 바로가기</button>
              </div>
            </div>
          </div>

          <div className="footer-bottom">

            <div className='footer-menu'>
              <p>이용약관</p>
              <p>개인정보 보호정책</p>
              <p>국가: South Korea</p>
            </div>

            <address>(주) 잭슨카멜레온 17382 경기 이천시 마장면 마도로 177 2층 대표 송재영 정봉윤 황두현 사업자번호 230-81-10281 [사업자정보확인]통신판매업 2015-경기포천-0086</address>
            <address>© JACKSONCHAMELEON, INC. ALL RIGHTS RESERVED</address>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer