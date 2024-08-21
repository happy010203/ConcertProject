import React, { useEffect, useState } from "react";
import styles from './body.module.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#00aced" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#00aced" }}
            onClick={onClick}
        />
    );
}

const Body = () => {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        fetch('https://api.example.com/movies')
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        centerMode: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className={styles.bodyDiv}>
            <div className={styles.newsSection}>
                <h2>最新消息</h2>
                <Slider {...settings} className={styles.newsSlider}>
                    {movies.map((movie, index) => (
                        <div key={index} className={styles.newsItem}>
                            <img src={movie.img} alt={movie.text} />
                            <div className={styles.newsInfo}>
                                <p>{movie.text}</p>
                                <p>片名: {movie.title}</p>
                                <p>導演: {movie.director}</p>
                                <p>上映日期: {movie.date}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            <div className={styles.movieSection}>
                <h2>現正熱映</h2>
                <Slider {...settings} className={styles.movieSlider}>
                    {movies.map((movie, index) => (
                        <div key={index} className={styles.movieItem}>
                            <a href={movie.url} target="_blank" rel="noopener noreferrer">
                                <img src={movie.img} alt={`${movie.title} 電影`} />
                                <h3>{movie.title}</h3>
                            </a>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Body;


