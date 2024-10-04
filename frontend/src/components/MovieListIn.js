import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styles from '../styles/MovieList.module.css'; // 引入模組樣式

export default function MovieListIn() {
    let [movieList, setMovieList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8443/movie/api/movie/movies")
            .then(response => response.json())
            .then(data => setMovieList(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.pageTitle}>現正熱映</h1>
            <div className={styles.movieContainer}>
                {movieList.map(movie => (
                    <div className={styles.movieBorder} key={movie.id}>
                        <Link to={'/MovieDetailIn/' + movie.id}>
                            <img className={styles.imgMovieList} src={movie.img} alt="moviePicture" /><br />
                        </Link>
                        <div className={styles.movieInfo}>
                            <p>{movie.title}</p>
                            <p>上映日期：{movie.released_date}</p>
                        </div>
                        <Link to={'/MovieDetailIn/' + movie.id}>
                            <button className={styles.btn}>詳細資訊</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
