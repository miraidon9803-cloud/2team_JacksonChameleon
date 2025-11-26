import React from "react";
import detailData from "../data/jacksonaboutdetail.json";
import "./scss/AboutStoryDetail.scss";
import { useParams } from "react-router-dom";

const AboutStoryDetail = () => {
  const { id } = useParams();

  const story = detailData.find((item) => String(item.id) === String(id));
  if (!story) {
    return <div>해당 스토리를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="AboutStoryDetail-wrap">
      <div className="inner">
        <div className="text-area">
          <p className="title">{story.alt}</p>
          <p className="sub-title">{story.text}</p>
          <p className="hash">#&nbsp;{story.subtitle}</p>
        </div>
        <div className="content-area">
          {story.contents.map((item, idx) => {
            if (item.type === "text")
              return (
                <p key={idx} className="text">
                  {item.value}
                </p>
              );
            if (item.type === "img")
              return (
                <img
                  className="img"
                  key={idx}
                  src={item.value}
                  alt={item.alt$}
                />
              );
            if (item.type === "text-top")
              return (
                <p key={idx} className="text-top">
                  {item.value}
                </p>
              );
            if (item.type === "text-info")
              return (
                <p key={idx} className="text-info">
                  {item.value}
                </p>
              );
            if (item.type === "text-bold")
              return (
                <p key={idx} className="text-bold">
                  {item.value}
                </p>
              );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutStoryDetail;
