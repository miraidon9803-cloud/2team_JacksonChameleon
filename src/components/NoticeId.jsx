import React from 'react'
import './scss/NoticeId.scss'
import { Link, useParams } from 'react-router-dom'

const NoticeId = () => {

    return (
        <section className='noticeid-wrap'>
            <div className='inner'>
                <div className="line1"></div>
                <h2>공지 샘플 원단 무료 신청 안내</h2>
                <div className="sub">
                    <p>2023-11-30</p>
                    <p>조회수 665</p>
                </div>
                <div className="line2"></div>
                <div className="noticeid-title">
                    <p className='des1'>Fabric Free Sample</p>
                    <p className='des2'>샘플 원단 무료 신청 서비스</p>
                    <p className='des3'>어떤 소파를 구매해야할지 고민이라면,<br />
                        실제 원단의 질감과 컬러를 직접 확인할 수 있는<br />
                        샘플 원단 무료 신청 서비스를 이용해 보세요.
                    </p>
                </div>
                <div className="noticeid-img-box">
                    <p><img src="/images/notice-id-1.jpg" alt="" /></p>
                </div>

                <div className="noticeid-link">
                    <Link to='/sample' className='link'>샘플신청 하러가기</Link>
                </div>

                <div className="noticepage-back">
                    <Link to="/notice">목록으로 돌아가기</Link>
                </div>
            </div>
        </section>
    )
}

export default NoticeId