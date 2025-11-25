import React from "react";
import { useParams, Link } from "react-router-dom";
import { noticedetail } from "../data/NoticeDetail";
import { Noticedata } from "../data/Notice";
import "./scss/NoticePage.scss";

const NoticePage = () => {
  const { id } = useParams();
  const detail = noticedetail.find((item) => item.id === Number(id));
  const info = Noticedata.find((item) => item.id === Number(id));

  if (!detail) {
    return <div className="detail-wrap">해당 공지를 찾을 수 없습니다.</div>;
  }

  return (
    <section className="noticepage-wrap">
      <div className="inner">
        <div className="line1"></div>

        <h2 className="noticepage-title">{info.title}</h2>

        <div className="noticepage-sub">
          <span>{info.day}</span>
          <span>조회수 {info.조회수.replace("조회 ", "")}</span>
        </div>

        <div className="line2"></div>

        <div className="noticepage-img">
          <img src={detail.img} alt={`공지 ${id}`} />
        </div>

        <div className="noticepage-back">
          <Link to="/community/notice">목록으로 돌아가기</Link>
        </div>
      </div>
    </section>
  );
};

export default NoticePage;
