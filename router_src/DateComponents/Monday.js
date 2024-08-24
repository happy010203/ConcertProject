import React from 'react';
import './Monday.css'; 

const Monday = () => {
  return (
    <section className="monday-container">
        <div className="movie-info">
            <p>台北欣欣秀泰<br />2廳</p>
            <p>2D英語</p>
        </div>
        <div className="schedule-container">
            <div className="schedule-button">11:00 早場</div>
            <div className="schedule-button">13:10</div>
            <div className="schedule-button">15:20</div>
            <div className="schedule-button">17:30</div>
            <div className="schedule-button">19:40</div>
            <div className="schedule-button">21:50</div>
            <div className="schedule-button">00:00 早場</div>
        </div>
    </section>
  );
};

export default Monday;
