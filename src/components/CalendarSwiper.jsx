import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import './scss/CalendarSwiper.scss'
import { Pagination } from "swiper/modules";

const CalendarSwiper = () => {
    return (
        <>
            <div className='process-wrap'>
                <div className='calender-process'>
                    소파클리닝 진행 프로세스
                </div>


                <Swiper
             
                    slidesPerView={2}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}

                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className="process-swiper">
                            <div className="process-main">
                                <p>Step 01</p>
                                <p>수리요청 및 날짜 예약</p>
                                <p>접수를 완료하시면 날짜예약과 함께 자세한 절차에 대한 정보를 안내해드립니다.</p>
                            </div>

                            <div className="process-sub">
                                <p>날짜확정 문자안내를  방문일 1일전 보내드립니다.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="process-swiper">
                            <div className="process-main">
                                <p>Step 02</p>
                                <p>방문 및 케어서비스</p>
                                <p>클리닝 매니저가 직접 방문하여 모듈형, 일체형 등 소파의 형태와 원단에 맞는 최적화된 클리닝 시스템을 통해 완벽한 서비스를 제공합니다.</p>
                            </div>

                            <div className="process-sub">
                                <p>서비스 진행 시간은 약 1-2시간 정도 소요됩니다. 단, 제품 사이즈와 컨디션에 따라 상이합니다.</p>
                            </div>
                        </div>

                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="process-swiper">
                            <div className="process-main">
                                <p>Step 03</p>
                                <p>살균 소독 서비스</p>
                                <p>UV-C와 피톤치드, 냄새 생분해제, 치아염소수 미립자 분사를 통해 눈에 보이지 않는 세균과 바이러스를 살균합니다</p>
                            </div>
                            <div className="process-sub">
                                <p>서비스 종료 후 건조는 최소 8시간 이상 하는 것을 권장드립니다</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>

                    </SwiperSlide>

                </Swiper>
            </div>
        </>
    )
}

export default CalendarSwiper