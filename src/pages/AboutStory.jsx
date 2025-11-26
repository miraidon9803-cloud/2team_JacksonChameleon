import React from "react";
import "./scss/About.scss";
import data from "../data/jackson-about.json";
import { Link, useNavigate } from "react-router-dom";
const AboutStory = () => {
  const navigate = useNavigate();
  const handleGoAbout = (id) => {
    navigate(`/about/story/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="stories-wrap">
      <div className="inner">
        <div className="about-btn">
          <p>
            <Link to="/about/brand">Brand</Link>
          </p>
          <p className="active">
            <Link to="/about/story">Stories</Link>
          </p>
        </div>
        <div className="stories-list">
          {data.map((item) => (
            <div
              onClick={() => handleGoAbout(item.id)}
              to={`/about/story/${item.id}`}
              key={item.id}
              className="stories"
            >
              <div className="img-box">
                <img src={item.img_url} alt={item.alt} />
              </div>
              <div className="title-box">
                <p className="title-main">{item.alt}</p>
                <p className="title-sub">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutStory;
