import React from 'react'
import './scss/Time.scss'

const Time = ({ selectedTime, setSelectedTime, times }) => {
  return (
    <div className="time-section">
      <div className="morning">
      <p>오전</p>
      <div className="time-buttons">
        {times.morning.map((t) => (
          <button
            key={t}
            type="button"
            className={selectedTime === t ? "active" : ""}
            onClick={() => setSelectedTime(t)}
          >
            {t}
          </button>
        ))}
        </div>
      </div>

      <div className="afternoon">
      <p>오후</p>
      <div className="time-buttons">
        {times.afternoon.map((t) => (
          <button
            key={t}
            type="button"
            className={selectedTime === t ? "active" : ""}
            onClick={() => setSelectedTime(t)}
          >
            {t}
          </button>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Time