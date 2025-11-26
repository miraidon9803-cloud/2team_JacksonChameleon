import React, { useRef, useState, useEffect } from "react";
import "./scss/Customer1.scss";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const chatBoxRef = useRef(null);
  const shouldScrollRef = useRef(true);

  const fileInputRef = useRef(null);

  const handleScroll = (e) => {
    const target = e.target;
    const isBottom =
      Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <
      10;

    shouldScrollRef.current = isBottom;
  };

  useEffect(() => {
    if (!chatBoxRef.current) return;
    if (shouldScrollRef.current) {
      const box = chatBoxRef.current;
      box.scrollTop = box.scrollHeight;
    }
  }, [messages]);

  const getTime = () => {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes().toString().padStart(2, "0");
    const ampm = h >= 12 ? "오후" : "오전";
    h = h % 12 || 12;
    return `${ampm} ${h}:${m}`;
  };

  const pushBot = (text) =>
    setMessages((prev) => [...prev, { from: "bot", text, time: getTime() }]);

  const handleSend = () => {
    if (!message.trim()) return;

    const userText = message;

    setMessages((prev) => [
      ...prev,
      { from: "user", text: userText, time: getTime() },
    ]);
    setMessage("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "상담사 연결중 입니다.\n잠시만 기다려주세요 😊",
          time: getTime(),
        },
      ]);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleCardClick = (text) => {
    setMessages((prev) => [...prev, { from: "user", text, time: getTime() }]);

    setTimeout(() => {
      let response = "";

      if (text.includes("배송기간")) {
        response =
          "일반 구매의 경우 3~4주 가량 소요 됩니다.(제주도제외)\n직배송 기준이며, 택배 배송 시 주문 후 2주 가량 소요됩니다.\n택배 배송 제품은 제품 설명란에 별도로 '택배 배송'이 기재되오니 확인 후 구매 바랍니다.\n정확한 배송 일정은 사전 해피콜을 통해 안내해 드립니다.";
      } else if (text.includes("지정 배송일")) {
        response =
          "지역별 배송일 지정은 제품 및 지역에 따라 달라질 수 있습니다.\n주소를 알려주시면 확인해드릴게요";
      } else if (text.includes("일부 상품만 취소")) {
        response =
          "결제를 완료된 날로부터 일반 구매 5일 이내 요청을 주셔야 별도의 위약금 없이 변경이\n가능하며, 이후 변경 시 제품가의 10%, 왕복배송물류 실비가 청구됩니다.\n주문번호를 알려주시면 처리 도와드릴게요";
      } else if (text.includes("주문 변경")) {
        response =
          "배송 전 단계라면 주문 변경이 가능합니다.\n변경 원하시는 내용을 말씀해주세요 ";
      } else {
        response = "상담사 연결중 입니다.\n잠시만 기다려주세요";
      }

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: response, time: getTime() },
      ]);
    }, 800);
  };

  const handleFileIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMessages((prev) => [
      ...prev,
      {
        from: "user",
        text: `📎 파일 업로드: ${file.name}`,
        time: getTime(),
      },
    ]);
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
            handleCardClick("주문 상품의 일부 상품만 취소하고 싶어요")
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

      <div className="chat-box" ref={chatBoxRef} onScroll={handleScroll}>
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.from}`}>
            {msg.from === "user" && (
              <span className="time user-time">{msg.time}</span>
            )}

            <div className="bubble">
              {msg.text.split("\n").map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx < msg.text.split("\n").length - 1 && <br />}
                </span>
              ))}
            </div>

            {msg.from === "bot" && (
              <span className="time bot-time">{msg.time}</span>
            )}
          </div>
        ))}
        <div />
      </div>

      <div className="chat-input">
        <div className="input-box">
          <span className="middle" onClick={handleFileIconClick}>
            <img src="/images/link.png" className="cus-link-img" />
          </span>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <input
            type="text"
            placeholder="원하시는 상담내용을 입력해주세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button className="send-btn" onClick={handleSend}>
          <span className="cus-send-text">
            <img src="/images/send.png" className="cus-send-img" />
            보내기
          </span>
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
