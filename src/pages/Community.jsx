import React from 'react'
import { Link } from 'react-router-dom'
import './scss/community.scss'

const Community = () => {
    return (
        <section className="community-wrap">
        <div className="inner">
        <div className="com-grid">
            <div className="com-card com-customer">
                <Link to='/Customer'> 
                <div className="com-text">Customer Service</div>                  
                    <img src="./images/cs_bg.png" alt="Customer Service" className="community" />
                </Link>
            </div>

            <div className="com-card com-notice">
                <Link to="/notice">
                <div className="com-text">Notice</div>
                    <img src="./images/notice_bg.png" alt="Notice" className="community" />
                </Link>
            </div>

            <div className="com-card com-jackson">
                    <img src="./images/logo2.png" alt="Jackson chameleon" />
            </div>

            <div className="com-card com-store">
                <Link to="/store">
                 <div className="com-text">Store</div>
                    <img src="./images/store_bg.png" alt="Store" className="community" />
                </Link>
            </div>
        </div>
        </div>
        </section>
    );
};
  


export default Community