import React from "react";
// import "./scss/customer.scss"
import Chatbot from "../components/Chatbot";


const Customer = () => {
  return (
    <section className="customer-wrap">
      <div className="inner">



        <div className="cus-text">
          <h2>
            안녕하세요
            <br />
            무엇을 도와드릴까요?
          </h2>
        </div>
        {/* 채팅 컴포넌트만 렌더 */}
        <Chatbot/>

        <div className="cus-background">
        </div>
      </div>
    </section>
  );
};

export default Customer;