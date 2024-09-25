import React, { useEffect, useState } from "react";
import styles from '../styles/HomePage.module.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#00aced", borderRadius: "50%" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#00aced", borderRadius: "50%" }}
            onClick={onClick}
        />
    );
}

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [news, setNews] = useState([]);

    // Fetching movies data
    useEffect(() => {
        fetch('http://localhost:8443/movie/api/movie/movies')
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    // Fetching news data
    useEffect(() => {
        fetch('http://localhost:8443/movie/api/movie/news')
            .then(response => response.json())
            .then(data => setNews(data))
            .catch(error => console.error('Error fetching news:', error));
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
        responsive: [
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    const settings1 = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <div className={styles.bodyDiv}>
            {/* News Section */}
            <div className={styles.newsSection}>
                <h2>最新消息</h2>
                <Slider {...settings1} className={styles.newsSlider}>
                    {news.map((item, index) => (
                        <div key={index} className={styles.newsItem}>
                            <img src={item.img} alt={item.text} />
                            <div className={styles.newsInfo}>
                                <strong>{item.text}</strong>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Movies Section */}
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
};

export default Home;
