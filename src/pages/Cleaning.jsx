import React, { useState } from 'react'
import Calendar from '../components/Calendar';
import Time from '../components/Time';
import SofaInput from '../components/SofaInput';
import CleaningSize from '../components/CleaningSize';
import CleaningFebric from '../components/CleaningFebric';
import CalendarSwiper from '../components/CalendarSwiper';
import '../pages/scss/Cleaning.scss'

const Cleaning = () => {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth() + 1);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [sofaName, setSofaName] = useState("");
    const [size, setSize] = useState("");
    const [material, setMaterial] = useState("");

    const prevMonth = () => {
        if (
            year < today.getFullYear() ||
            (year === today.getFullYear() && month <= today.getMonth() + 1)
        )
            return;

        if (month === 1) {
            setMonth(12);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
        setSelectedDay(null);
    };

    const nextMonth = () => {
        if (month === 12) {
            setMonth(1);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
        setSelectedDay(null);
    };

    const times = { morning: ["10:00", "11:00"], afternoon: ["12:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00"], };

    const sizes = ["~1,800mm", "~2,400mm", "~3,000mm", "3,000mm 이상"];

    const materials = ["Fabric", "Leather"];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedDay || !selectedTime || !sofaName || !size || !material) {
            alert("모든 항목을 선택해주세요.");
            return;
        }

        alert(`
      신청완료!
      날짜: ${year}.${month}.${selectedDay}
      시간: ${selectedTime}
      제품: ${sofaName}
      사이즈: ${size}
      원단: ${material}
    `);

      window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
        window.location.reload();
        }, 200); // 0.3초 후 새로고침
            };


    return (
        <section className='cleaning-wrap'>
            <div className="inner">
                <div className="calendar-top">
                    <h2>프리미엄 소파 클리닝 서비스</h2>
                    <p>프리미엄 소파 클리닝은 패브릭 소파의 먼지,얼룩,세균까지 꼼꼼히 제거하는 전문 서비스입니다.<br />
                        낙서,알레르기,반려동물 오염 등 다양한 문제를 케어해 소파 수명을 건강하게 관리하세요</p>
                    <p><img src="/images/cleaning-service.png" alt="" /></p>
                </div>


                <div className='cleaning-process'> <CalendarSwiper /> </div>

                <div className="calendar-list">



                    <div className='calendar-title'>
                        <p>클리닝 서비스 신청</p>
                    </div>

                    <div className="calendar-right">
                        <div className='calendar-depth1'>날짜와 시간을 선택해주세요 </div>

                        <div className="calendar-md">
                            <div className='calendar'>
                                <Calendar
                                    year={year}
                                    month={month}
                                    today={today}
                                    selectedDay={selectedDay}
                                    setSelectedDay={setSelectedDay}
                                    prevMonth={prevMonth}
                                    nextMonth={nextMonth}
                                />
                            </div>

                            <div className='calendar-time'>
                                <Time
                                    selectedTime={selectedTime}
                                    setSelectedTime={setSelectedTime}
                                    times={times}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="calendar-left">
                    <div className="canlendar-blank"></div>
                    <div className='calendar-mid1'>클리닝 받을 제품에 대해 적어주세요</div>
                </div>

                <div className="calendar-left">
                    <div className="canlendar-blank"></div>
                    <SofaInput sofaName={sofaName} setSofaName={setSofaName} />
                </div>

                <div className="calendar-left">
                    <div className="canlendar-blank"></div>
                    <CleaningSize size={size} setSize={setSize} sizes={sizes} />
                </div>

                <div className="calendar-left">
                    <div className="canlendar-blank"></div>
                    <CleaningFebric material={material} setMaterial={setMaterial} materials={materials} />

                </div>

                <div className="calendar-left">
                    <div className="canlendar-blank"></div>
                    <button type="submit" className="submit-btn" onClick={handleSubmit}>
                        신청하기
                    </button>

                </div>

            </div>


        </section >
    )
}

export default Cleaning