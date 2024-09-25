import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/header.module.css';
import search_icon from '../assets/search.png';
import movie_icon from '../assets/movie.png';
import axios from 'axios';

const HeaderIn = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [roles, setRoles] = useState(JSON.parse(localStorage.getItem('roles') || '[]'));
    const navigate = useNavigate();

    useEffect(() => {
        // 每當 roles 在 localStorage 中變更時，更新狀態
        const storedRoles = JSON.parse(localStorage.getItem('roles') || '[]');
        setRoles(storedRoles);
    }, []);

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

    const handleLogout = () => {
        // 清空 localStorage 並將 token 和 roles 設為 null
        localStorage.clear();
        navigate('/home'); // 導向首頁
    };

    return (
        <div className={styles.headerSTY}>
            <Link to="/HomePageIn">
                <img src={movie_icon} alt="Logo" className={styles.logo} />
            </Link>
            <ul>
                <li><Link to="/MovieListIn">電影資訊</Link></li>
                <li><Link to="/AboutPageIn">關於我們</Link></li>
                <li><Link to="/OrderListIn">購票紀錄</Link></li>
                <li><Link to="/CheckOutIn">購物車</Link></li>
                {/* <li><Link to="/UserListIn">會員中心</Link></li> */}
                {/* 根據 roles 顯示 "系統管理" */}
                {roles.includes("ROLE_MANAGER") || roles.includes("ROLE_ADMIN") ? (
                    <li><Link to="/schedule">系統管理</Link></li>
                ) : null}
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
                                <Link to={'/MovieDetailIn/' + movie.id}>
                                    <strong>{movie.title}</strong> - {movie.director} - {movie.date}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className={styles['user-actions']}>
                {/* 已登入時顯示登出按鈕 */}
                <button onClick={handleLogout} className="btn btn-outline-secondary">👤 登出</button>
            </div>
        </div>
    );
};

export default HeaderIn;
