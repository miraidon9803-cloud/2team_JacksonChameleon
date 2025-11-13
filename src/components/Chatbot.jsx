import React, { useEffect, useRef, useState } from "react";
import "./scss/Customer1.scss"
const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const chatEndRef = useRef(null);

    // useEffect(() => {
    //     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // }, [messages]);

    const pushBot = (text) =>
        setMessages((prev) => [...prev, { from: "bot", text }]);

    const handleSend = () => {
        if (!message.trim()) return;

        const userText = message;
        setMessages((prev) => [...prev, { from: "user", text: userText }]);
        setMessage("");

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { from: "bot", text: "상담사 연결중 입니다.\n잠시만 기다려주세요 😊" }
            ]);
        }, 800);
    };


    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSend();
    };

    const handleCardClick = (text) => {
        
        setMessages((prev) => [...prev, { from: "user", text }]);

        setTimeout(() => {
            let response = "";

            if (text.includes("배송기간")) {
                response = "배송 기간은 보통 2~3주 정도 소요됩니다 😊";
            } else if (text.includes("지정 배송일")) {
                response = "지역별 배송일 지정은 제품 및 지역에 따라 달라질 수 있습니다.\n주소를 알려주시면 확인해드릴게요 🚚";
            } else if (text.includes("일부 상품만 취소")) {
                response = "일부 상품 취소는 가능합니다.\n주문번호를 알려주시면 처리 도와드릴게요 🙌";
            } else if (text.includes("주문 변경")) {
                response = "배송 전 단계라면 주문 변경이 가능합니다.\n변경 원하시는 내용을 말씀해주세요 ✏️";
            } else {
                response = "상담사 연결중 입니다.\n잠시만 기다려주세요 😊";
            }

            setMessages((prev) => [...prev, { from: "bot", text: response }]);
        }, 800);
    };
    return (
        <div className="chatbot-wrap">

            <div className="qa-cards">
                <button
                    className="qa-card"
                    onClick={() => handleCardClick("배송기간은 얼마나 걸리나요")}
                >
                    <span className="q">Q.</span> 배송기간은 얼마나 걸리나요?
                </button>
                <button
                    className="qa-card"
                    onClick={() => handleCardClick("지역별 지정 배송일 확인 가능한가요")}
                >
                    <span className="q">Q.</span> 지역별 지정 배송일 확인 가능한가요
                </button>
                <button
                    className="qa-card"
                    onClick={() =>
                        handleCardClick("주문 상품의 전체 또는 일부 상품만 취소하고 싶어요")
                    }
                >
                    <span className="q">Q.</span> 일부 상품만 취소할 수 있나요
                </button>
                <button
                    className="qa-card"
                    onClick={() => handleCardClick("제품을 주문 변경하고 싶어요")}
                >
                    <span className="q">Q.</span> 주문 변경이 가능할까요
                </button>
            </div>

            {/* 채팅창 */}
            <div className="chat-box">
                {messages.map((msg, i) => (
                    <div key={i} className={`message ${msg.from}`}>
                        {/* \n 줄바꿈 처리를 위한 span */}
                        <div className="bubble">
                            {msg.text.split("\n").map((line, idx) => (
                                <span key={idx}>
                                    {line}
                                    {idx < msg.text.split("\n").length - 1 && <br />}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            {/* 입력창 */}
            <div className="chat-input">
                <div className="input-box">
                    <span className="middle"><img src="/images/link.png" className="cus-link-img" />| </span>
                    <input
                        type="text"
                        placeholder="원하시는 상담내용을 입력해주세요"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <button className="send-btn" onClick={handleSend}>
                    <span className="cus-send-text"><img src="/images/send.png" className="cus-send-img" />보내기</span>
                </button>
            </div>
        </div>
    );
};

export default Chatbot;