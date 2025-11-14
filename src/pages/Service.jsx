import React from 'react'
import { Link } from "react-router-dom";
import "./scss/Service.scss"

const Service = () => {
  return (
    <div className='service-wrap'>
      <video className='video-bg' src="/images/service_main.mp4" autoPlay muted playsInline loop></video>
      <div className="inner">
        <div className="margin-wrap">
          <div className='service-text-box'>
            <h2 className='service-title'>고객님을 위한 잭슨카멜레온만의 서비스를 경험해 보세요</h2>
            <div className="service-btn">
              <p><Link>클리닝 서비스 접수하기</Link></p>
              <p><Link>원단 샘플 접수하기</Link></p>
              
        
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Service