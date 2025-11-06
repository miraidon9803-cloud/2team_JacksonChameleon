import React from 'react'
import "./scss/footer.scss"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <div className="inner">
        <div className="footer-top">
          <div className="footer-left">
            <h1><img src="./images/footer-logo.png" alt="footer-logo" /></h1>
            <div className="icon-wrap">
              <p><img src="./images/facebook.png" alt="facebook" /></p>
              <p><img src="./images/instagram.png" alt="instagram" /></p>
              <p><img src="./images/x.png" alt="x" /></p>
              <p><img src="./images/youtube.png" alt="youtube" /></p>
            </div>
          </div>


          <div className="footer-right">
            <div className="show-room">
              <h3>SHOW ROOM</h3>
              <div className="room-text">
                <span><strong>연희점</strong> 서울 서대문구 연희로 11가길 42</span>
                <span><strong>판교점</strong> 경기 성남시 분당구 판교역로 146번길 20</span>
                <span><strong>무브먼트랩</strong> 전국 지점</span>
              </div>
            <p className='room-btn'><Link to ="/map">매장 안내 바로가기</Link></p>
            </div>
           


            <div className="customer-center">
              <h3>CUSTOMER CENTER</h3>
              <div className="customer-text">
                <span className='call'>1855-2014</span>
                <span>평일 10:00 - 18:00 (점심시간 12:00 - 13:00)</span>
                <span className='day'>(*주말, 공휴일 휴무)</span>
              </div>
              <p className='online-btn'><Link to ="/cs">온라인 문의 바로가기</Link></p>
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
    </footer>
  )
}

export default Footer