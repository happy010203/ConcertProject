import React, { useState } from 'react';
import axios from 'axios';
import styles from './header.module.css';
import search_icon from '../assets/search.png';
import movie_icon from '../assets/movie.png';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState(''); 
    const [filteredMovies, setFilteredMovies] = useState([]); 
    const [isSearchActive, setIsSearchActive] = useState(false);

    const handleInputChange = async (query) => {
        setSearchQuery(query);

        if (query) {
            try {
                const response = await axios.get(`/api/search?keyword=${query}`);
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
        <div className={styles.headerST}>
            <img src={movie_icon} alt="Logo" className={styles.logo} />

            <ul>
                <li>訂票</li>
                <li>電影資訊</li>
                <li>Features</li>
                <li>About</li>
            </ul>

            <div className={styles['search-box']}>
                <input
                    type="text"
                    placeholder='Search'
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
                                <a href={movie.url}>
                                    <strong>{movie.title}</strong> - {movie.director} - {movie.date}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            <div className={styles['user-actions']}>
                <a href=" " className="btn btn-outline-secondary ml-2">🛒 CART</a>
                <a href=" " className="btn btn-outline-secondary">👤 MY ACCOUNT</a>
            </div>
        </div>
    );
};

export default Header;




