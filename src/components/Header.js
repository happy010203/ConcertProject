import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/header.module.css';
import search_icon from '../assets/search.png';
import movie_icon from '../assets/movie.png';
import axios from 'axios';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [isSearchActive, setIsSearchActive] = useState(false);

    const handleInputChange = async (query) => {
        setSearchQuery(query);

        if (query) {
            try {
                const response = await axios.get(`http://localhost:8443/movie/api/movie/search?keyword=${query}`);
                setFilteredMovies(response.data);
            } catch (error) {
                console.error('搜尋失敗:', error);
            }
        } else {
            setFilteredMovies([]);
        }
    };

    const handleSearch = () => {
        if (searchQuery) {
            setIsSearchActive(true);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className={styles.headerSTY}>
            <Link to="/home">
                <img src={movie_icon} alt="Logo" className={styles.logo} />
            </Link>
            <ul>
                <li><Link to="/MovieList">電影資訊</Link></li>
                <li><Link to="/about">關於我們</Link></li>
                <li><Link to="/OrderList">購票紀錄</Link></li>
                {/* <li><Link to="/CheckOut">購物車</Link></li> */}
            </ul>

            <div className={styles['search-box']}>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <img
                    src={search_icon}
                    alt="Search Icon"
                    onClick={handleSearch}
                />
            </div>

            {isSearchActive && (
                <div className={styles['search-results']}>
                    <h3>搜尋結果：</h3>
                    <ul>
                        {filteredMovies.map((movie, index) => (
                            <li key={index}>
                                <Link to={'/MovieDetail/' + movie.id}>
                                    <strong>{movie.title}</strong> - {movie.director} - {movie.date}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className={styles['user-actions']}>
                {/* 未登入時顯示登入按鈕 */}
                <Link to="/login" className="btn btn-outline-secondary">👤 會員登入</Link>
            </div>
        </div>
    );
};

export default Header;

