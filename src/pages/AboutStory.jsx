import React from 'react'
import './scss/About.scss'
import data from '../data/jackson-about.json'
import { Link } from 'react-router-dom'
const AboutStory = () => {
    return (
        <div className='stories-wrap'>
            <div className="inner">
                <div className="about-btn">
                    <p className='active'><Link>Brand</Link></p>
                    <p><Link to="/about/story">Stories</Link></p>
                </div>
                <div className="stories-list">
                    {data.map((item) => (
                        <div className="stories" key={item.id}>
                            <div className='img-box'><img src={item.img_url} alt="" /></div>
                            <div className="title-box">
                                <p className="title-main">{item.alt}</p>
                                <p className="title-sub">{item.text}</p>
                            </div>
                        </div>
                    ))}
                    {/* <div className="stories box1">
                        <div className="img-box"><img src="/images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div>
                    <div className="stories">
                        <div className="img-box"><img src="./images/story.jpg" alt="" /></div>
                        <div className="title-box">
                            <p className="title-main">Colour Edition 2025</p>
                            <p className="title-sub">컬러에디션 2025</p>
                        </div>
                    </div> */}
                </div>
            </div>
        </div >
    )
}

export default AboutStory