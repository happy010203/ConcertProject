import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import './ShowMovieAndTime.css';

export default function ShowMovieAndTime({ movieId }) {
    const [cinemas, setCinemas] = useState([]);
    const [showdates, setShowdates] = useState([]);
    const [showtimes, setShowtimes] = useState([]);
    const [halls, setHalls] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedCinema, setSelectedCinema] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/cinemas')
            .then(response => response.json())
            .then(data => setCinemas(data));
    }, []);

    const handleCinemaClick = (cinemaId) => {
        setSelectedCinema(cinemaId);

        fetch(`http://localhost:8080/api/showtimes/cinemas/${cinemaId}/showdates`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch showdates');
                }
                return response.json();
            })
            .then(data => {
                setShowdates(data);
                if (data.length > 0) {
                    const defaultDateId = data[0].showdate_id;
                    setSelectedDate(defaultDateId);
                    fetchShowtimes(cinemaId, defaultDateId); // 调用 fetchShowtimes 函数
                } else {
                    setShowtimes([]);
                }
            })
            .catch(error => console.error('Error fetching showdates:', error));
    };

    const handleDateClick = (showDateId) => {
        setSelectedDate(showDateId);
        if (selectedCinema) {
            fetchShowtimes(selectedCinema, showDateId); // 调用 fetchShowtimes 函数
        }
    };

    // 新增的 fetchShowtimes 函数，用于获取并过滤 showtimes 数据
    const fetchShowtimes = (cinemaId, showDateId) => {
        fetch(`http://localhost:8080/api/showtimes/cinemas/${cinemaId}/showtimes/${showDateId}`)
            .then(response => response.json())
            .then(data => {
                const filteredShowtimes = data.filter(showtime =>
                    showtime.fk_movie_id === movieId // 根据 movieId 过滤 showtimes
                );
                setShowtimes(filteredShowtimes);
                const hallIds = filteredShowtimes.map(showtime => showtime.hall.hall_id).filter(id => id != null);
                const uniqueHallIds = [...new Set(hallIds)];
                if (uniqueHallIds.length > 0) {
                    Promise.all(uniqueHallIds.map(hallId =>
                        fetch(`http://localhost:8080/api/halls/${hallId}`).then(res => res.json())
                    )).then(hallsData => setHalls(hallsData));
                } else {
                    setHalls([]);
                }
            })
            .catch(error => console.error('Error fetching showtimes:', error));
    };

    // 将 showtimes 按照 hall_id 进行分组
    const groupedShowtimes = halls.map(hall => ({
        hall,
        times: showtimes.filter(showtime => showtime.hall.hall_id === hall.hall_id)
    }));

    return (
        <div>
            <h1>選擇影院</h1>
            <div className="cinema-buttons">
                {cinemas.map(cinema => (
                    <button key={cinema.cinema_id} onClick={() => handleCinemaClick(cinema.cinema_id)}>
                        {cinema.name}
                    </button>
                ))}
            </div>

            {selectedCinema && (
                <div className="showtimes">
                    <div className="showdates">
                        {showdates.map(date => (
                            <button key={date.showdate_id}
                                onClick={() => handleDateClick(date.showdate_id)}
                                className='showdate-info'>
                                {date.show_date}
                            </button>
                        ))}
                    </div>
                    <div className="showtime-group">
                        {groupedShowtimes.map((group, index) => (
                            <div key={index} className="showtime-row">
                                <div className="hall-info">
                                    <div>{group.hall.hall_number}廳</div>
                                    <div>{group.hall.hall_type}</div>
                                </div>
                                <div className="showtimes-list">
                                    {group.times.map(showtime => (
                                        <Link to={'/showtimes/' + showtime.showtime_id}>
                                            <button
                                                key={showtime.showtime_id}
                                                className="showtime-item"
                                                onClick={() => console.log(showtime)}
                                            >
                                                {showtime.show_time.toString()}
                                            </button>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
