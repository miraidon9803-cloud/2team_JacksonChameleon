import React, { useState } from 'react'
import './scss/Sample.scss'

const Sample = () => {
    const [selected, setSelected] = useState([]);
    const [agree, setAgree] = useState(false);
    const fabrics = [...Array(56)].map((_, i) => `/images/febric/febric-${i + 1}.jpg`);

    const toggleSelect = (img) => {
        if (selected.includes(img)) {
            setSelected(selected.filter((item) => item !== img));
        } else {
            if (selected.length >= 5) {
                alert("최대 5개까지만 선택할 수 있습니다.");
                return;
            }
            setSelected([...selected, img]);
        }
    };

    const handleSubmit = () => {
        if (!agree) {
            alert("동의하기에 체크해 주세요!");
            return;
        }
        if (selected.length === 0) {
            alert("샘플을 최소 1개 이상 선택해 주세요.");
            return;
        }

        alert("신청이 완료되었습니다!");

        window.scrollTo(0, 0);
        window.location.reload();
    };

    return (
        <section className='sample-wrap'>
            <div className="inner">
                <div className="sample-title">
                    <h2>샘플 원단 무료 신청 서비스</h2>
                    <p>잭슨카멜레온의 패브릭 원단 질감과 컬러를 직접 경험할 수 있는 샘플 원단 무료 신청 서비스입니다.
                        <br />어떤 소파를 구매해야할지 고민이라면, 실제 원단의 질감과 컬러를 확인한 후에 결정해 보세요.</p>
                </div>
                <div className='gif-file'></div>

                <div className="sample-caution1">
                    <div className='caution-left1'>주의 사항</div>

                    <div className="caution-right1">
                        <div className='caution-des1'>받아보고 싶은 패브릭 샘플을 신청해 주시면 매주 금요일 일반우편으로 발송해 드립니다.</div>
                        <div className='caution-des2'>
                            <p>* 신청 가능 샘플 수량 5개까지 제한</p>
                            <p> * 단종 패브릭 또는 가죽 원단 신청 불가</p>
                        </div>
                    </div>
                </div>

                <div className="sample-caution2">
                    <div className='caution-left2'>샘플 원단 신청</div>

                    <div className="caution-right2">
                        <p className='right2-des'>원하시는 샘플을 최대 5개까지 골라주세요</p>

                        <div className="sample-img-box">
                            {fabrics.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`img-box ${selected.includes(img) ? "active" : ""}`}
                                    onClick={() => toggleSelect(img)}>
                                    <img src={img} alt={`fabric-${idx + 1}`} />
                                    <div className="overlay">선택</div>
                                </div>
                            ))}
                            {/* <p><img src="/images/febric/febric-1.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-2.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-3.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-4.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-5.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-6.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-7.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-8.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-9.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-10.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-11.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-12.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-13.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-14.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-15.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-16.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-17.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-18.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-19.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-20.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-21.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-22.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-23.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-24.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-25.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-26.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-27.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-28.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-29.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-30.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-31.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-32.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-33.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-34.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-35.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-36.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-37.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-38.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-39.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-40.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-41.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-42.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-43.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-44.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-45.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-46.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-47.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-48.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-49.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-50.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-51.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-52.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-53.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-54.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-55.jpg" alt="" /></p>
                            <p><img src="/images/febric/febric-56.jpg" alt="" /></p> */}
                        </div>

                        <div className="sample-last">
                            <label className="circle-check">
                                <input
                                    type="checkbox"
                                    className="sample-agree"
                                    checked={agree}
                                    onChange={(e) => setAgree(e.target.checked)}/>
                                <span className="checkmark"></span>
                                <p>등기 발송으로 최대 5-7일 소요될 수 있습니다. 동의하시나요?</p>
                            </label>

                            <button onClick={handleSubmit}>신청하기</button>
                        </div>

                    </div>
                </div>
            </div>
        </section >
    )
}

export default Sample

