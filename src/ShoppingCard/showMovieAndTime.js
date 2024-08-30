import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//20240823................
export default function ShowMovieAndTime({ movieId }) {
    const [cinemas, setCinemas] = useState([]);
    const [showdates, setShowdates] = useState([]);
    const [showtimes, setShowtimes] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedCinema, setSelectedCinema] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/cinemas')
            .then(response => response.json())
            .then(data => setCinemas(data));
    }, []);

    const handleCinemaClick = (cinemaId) => {
        setSelectedCinema(cinemaId);

        fetch(`http://localhost:5000/api/showtimes/cinemas/${cinemaId}/showdates`)
            .then(response => response.json())
            .then(data => {
                setShowdates(data);
                if (data.length > 0) {
                    const defaultDateId = data[0].id;
                    setSelectedDate(defaultDateId);
                    fetch(`http://localhost:5000/api/showtimes/cinemas/${cinemaId}/showtimes/${defaultDateId}`)
                        .then(response => response.json())
                        // 过滤 showtimes 数据，只显示与当前电影相关的播放时间
                        .then(data => setShowtimes(data.filter(showtime => showtime.fk_moviedetail === movieId && showtime.fk_show_date_id === defaultDateId)))
                        .catch(error => console.error('Error fetching showtimes:', error));
                } else {
                    setShowtimes([]);
                }
            })
            .catch(error => console.error('Error fetching showdates:', error));
    };

    const handleDateClick = (dateId) => {
        setSelectedDate(dateId);

        if (selectedCinema) {
            fetch(`http://localhost:5000/api/showtimes/cinemas/${selectedCinema}/showtimes/${dateId}`)
                .then(response => response.json())
                // 过滤 showtimes 数据，只显示与当前电影相关的播放时间
                .then(data => setShowtimes(data.filter(showtime => showtime.fk_moviedetail === movieId && showtime.fk_show_date_id === dateId)))
                .catch(error => console.error('Error fetching showtimes:', error));
        }
    };

    // 將 showtimes 依據 hall_type 和 hall_number 分組
    const groupedShowtimes = showtimes.reduce((acc, showtime) => {
        const key = `${showtime.hall_type}-${showtime.hall_number}`;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(showtime);
        return acc;
    }, {});

    return (
        <div>
            <h1>選擇影院</h1>
            <div className="cinema-buttons">
                {cinemas.map(cinema => (
                    <button key={cinema.id} onClick={() => handleCinemaClick(cinema.id)}>
                        {cinema.name}
                    </button>
                ))}
            </div>

            {selectedCinema && (
                <div className="showtimes">
                    <div className="showdates">
                        {showdates.map((date) => (
                            <button key={date.id} onClick={() => handleDateClick(date.id)}>
                                {date.show_date}
                            </button>
                        ))}
                    </div>
                    <div className="showtimes">
                        {Object.keys(groupedShowtimes).map((key) => (
                            <div key={key} className="showtime">
                                <div className="showtime-info">
                                    <div>{key}</div>
                                    <div className="showtime-time">
                                        {groupedShowtimes[key].map(showtime => (
                                            <button 
                                                key={showtime.id}
                                                className="showtime-button"
                                            >
                                                {showtime.show_time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}