import React from "react";
import './scss/Calendar.scss'

const Calendar = ({
  year,
  month,
  today,
  selectedDay,
  setSelectedDay,
  prevMonth,
  nextMonth,
}) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();

  const isThisMonth =
    year === today.getFullYear() && month === today.getMonth() + 1;

  const days = [];
  for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const isPastDate = (d) => {
    const current = new Date(year, month - 1, d);
    return (
      current <
      new Date(today.getFullYear(), today.getMonth(), today.getDate())
    );
  };

  const isWeekend = (d) => {
    const day = new Date(year, month - 1, d).getDay();
    return day === 0;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button
          type="button"
          onClick={prevMonth}
          className={`nav-btn ${isThisMonth ? "disabled" : ""}`}
          disabled={isThisMonth}
        >
          <img src="/images/premonth-arrow.png" alt="" />
        </button>

        <span>
          {year}.{String(month).padStart(2, "0")}
        </span>

        <button type="button" onClick={nextMonth} className="nav-btn">
          <img src="/images/nextmonth-arrow.png" alt="" />
        </button>
      </div>

      <div className="weekday-row">
        {["일", "월", "화", "수", "목", "금", "토"].map((w) => (
          <div key={w} className="weekday">
            {w}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((d, id) =>
          d ? (
            <button
              key={id}
              type="button"
              className={`calendar-day
                  ${selectedDay === d ? "active" : ""}
                  ${isPastDate(d) && isWeekend(d) ? "disabled" : ""}
                  ${id % 7 === 0 ? "sunday" : ""}
                  ${year === today.getFullYear() &&
                  month === today.getMonth() + 1 &&
                  d === today.getDate()
                  ? "today"
                  : ""
                }
                `}
              onClick={() => {
                if (!isPastDate(d)) setSelectedDay(d);
              }}
              disabled={isPastDate(d) || isWeekend(d)}
            >
              <span className="day-number">{d}</span>

              {/* 오늘인 경우에만 표시 */}
              {year === today.getFullYear() &&
                month === today.getMonth() + 1 &&
                d === today.getDate() ? (
                <span className="today-label">오늘</span>
              ) : <span className="nottoday-label">null</span>}
            </button>

          ) : (
            <div key={id} className="empty-day" />
          )
        )}
      </div>
    </div>
  );
};

export default Calendar;
