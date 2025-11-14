import React from 'react'
import "./scss/NotFound.scss";
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className='notfound-wrap'>
        <div className="inner">
            <h2 className='notfound-title'>Oops!</h2>
            <ul className='notfound-list'>
                <li>
                    <span className='first-four'><img src="/images/four.png" alt="" /></span>
                    <span className='not-sofa'><img src="/images/not-sofa.png" alt="" /></span>
                    <span className='second-four'><img src="/images/four.png" alt="" /></span>
                    </li>
                <li>찾을 수 없는 페이지입니다.<br/>요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요.</li>
                <li>This page is missing or you assembled the link incorrectly</li>
            </ul>
            <Link to="/" className='notfound-home'>홈으로 돌아가기</Link>
            

        </div>
    </section>
  )
}

export default NotFound