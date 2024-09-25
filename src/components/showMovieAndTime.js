import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styles from '../styles/ShowMovieAndTime.module.css'; // 導入模組化的CSS

export default function ShowMovieAndTime({ movieId }) {
    const [cinemas, setCinemas] = useState([]);
    const [showdates, setShowdates] = useState([]);
    const [showtimes, setShowtimes] = useState([]);
    const [halls, setHalls] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedCinema, setSelectedCinema] = useState(null);

    //抓取cinemas的資料
    useEffect(() => {
        fetch('http://localhost:8443/movie/api/movie/cinemas')
            .then(response => response.json())
            .then(data => setCinemas(data));
    }, []);

    //點擊cinemas的按鈕，出現showdate的按鈕
    const handleCinemaClick = (cinemaId) => {
        setSelectedCinema(cinemaId);

        fetch(`http://localhost:8443/movie/api/movie/cinemas/${cinemaId}/showdates`)
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
                    console.log("Fetched showtimes:", filteredShowtimes);
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
        fetch(`http://localhost:8443/movie/api/movie/cinemas/${cinemaId}/showtimes/${showDateId}`)
            .then(response => response.json())
            .then(data => {
                const filteredShowtimes = data.filter(showtime =>
                    showtime.movie.id === movieId // 根据 movieId 过滤 showtimes
                );
                setShowtimes(filteredShowtimes);
                const hallIds = filteredShowtimes.map(showtime => showtime.hall.hall_id).filter(id => id != null);
                const uniqueHallIds = [...new Set(hallIds)];
                if (uniqueHallIds.length > 0) {
                    Promise.all(uniqueHallIds.map(hallId =>
                        fetch(`http://localhost:8443/movie/api/movie/halls/${hallId}`)
                        .then(res => res.json())
                    )).then(hallsData => {
                        setHalls(hallsData);
                        console.log("Fetched halls:", hallsData);
                    });
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
            <div className={styles.cinemaButtons}>
                {cinemas.map(cinema => (
                    <button key={cinema.cinema_id} onClick={() => handleCinemaClick(cinema.cinema_id)}>
                        {cinema.name}
                    </button>
                ))}
            </div>

            {selectedCinema && (
                <div className={styles.showtimes}>
                    <div className={styles.showdates}>
                        {showdates.map(date => (
                            <button key={date.showdate_id}
                                onClick={() => handleDateClick(date.showdate_id)}
                                className={styles.showdateInfo}>
                                {date.show_date}
                            </button>
                        ))}
                    </div>
                    <div className={styles.showtimeGroup}>
                        {groupedShowtimes.map((group, index) => (
                            <div key={index} className={styles.showtimeRow}>
                                <div className={styles.hallInfo}>
                                    <div>{group.hall.hall_number}廳</div>
                                    <div>{group.hall.hall_type}</div>
                                </div>
                                <div className={styles.showtimesList}>
                                    {group.times.map(showtime => (
                                        <Link key={showtime.showtime_id} to={`/area/${showtime.showtime_id}`}>
                                            <button
                                                className={styles.showtimeItem}
                                            >
                                                {showtime.show_time}
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
