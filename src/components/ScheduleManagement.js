import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/ScheduleManagement.module.css';
import { Link } from 'react-router-dom';

const ScheduleManagement = () => {
    const [movies, setMovies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [newMovie, setNewMovie] = useState({
        img: '',
        title: '',
        genre: '',
        director: '',
        description: '',
        date: '',
        actor: '',
        duration: '',
        status: 'FALSE',
    });
    const [file, setFile] = useState(null);
    const [tempStatus, setTempStatus] = useState('FALSE');

    // 從後端獲取電影數據
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('請先登錄');
            window.location.href = '/login';
            return;
        }

        axios.get('http://localhost:8443/movie/api/admin/movies', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
                if (error.response && error.response.status === 401) {
                    alert('Token 已過期或無效，請重新登錄');
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }
            });
    }, []);

    // 顯示模態框並填充選定電影的信息
    const handleCardClick = (movie) => {
        setSelectedMovie(movie);
        setNewMovie({
            img: movie.img,
            title: movie.title,
            genre: movie.genre,
            director: movie.director,
            description: movie.description,
            date: movie.date,
            actor: movie.actor,
            duration: movie.duration,
            status: movie.status ? 'TRUE' : 'FALSE',
        });
        setShowModal(true);
    };

    

    // 處理輸入字段的更改
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMovie({ ...newMovie, [name]: value });
    };

    // 處理圖像文件的上傳
    const handleImageUpload = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
            setNewMovie({ ...newMovie, img: reader.result });
        };
        reader.readAsDataURL(selectedFile);
    };

    // 保存更新後的電影信息
    const saveUpdatedMovie = () => {
        if (!newMovie.title || !newMovie.director || !newMovie.actor || !newMovie.description || !newMovie.genre || !newMovie.duration || !newMovie.date) {
            alert('請確保所有字段都已填寫');
            return;
        }
    
        const formData = new FormData();
        if (file) {
            formData.append('file', file);
        }
        formData.append('title', newMovie.title);
        formData.append('director', newMovie.director);
        formData.append('actor', newMovie.actor);
        formData.append('description', newMovie.description);
        formData.append('genre', newMovie.genre);
        formData.append('duration', newMovie.duration);
        formData.append('date', newMovie.date);
        formData.append('status', newMovie.status);
    
        const token = localStorage.getItem('token');
        if (!token) {
            alert('請先登錄');
            window.location.href = '/login';
            return;
        }
    
        const url = selectedMovie ? `http://localhost:8443/movie/api/admin/movie/${selectedMovie.id}/update` : 'http://localhost:8443/movie/api/admin/add-movie';
        const method = selectedMovie ? 'put' : 'post';
    
        axios({
            method: method,
            url: url,
            data: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(response => {
            if (selectedMovie) {
                setMovies(movies.map(movie =>
                    movie.id === selectedMovie.id ? { ...response.data } : movie
                ));
            } else {
                setMovies([...movies, response.data]);
            }
            setShowModal(false);
        })
        .catch(error => {
            console.error('Error updating or adding movie:', error);
            if (error.response && error.response.status === 401) {
                alert('Token 已過期或無效，請重新登錄');
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        });
    };
    
    return (
        <div>
            {/* 頂部導航欄 */}
            <div className={styles.headerST}>
                <ul>
                    <li><Link to="/schedule">檔期管理</Link></li>
                    <li><Link to="/news">新聞管理</Link></li>
                    <li><Link to="/user_management">用戶管理</Link></li>
                    <li><Link to="/order">查詢訂單</Link></li>
                </ul>
            </div>

            {/* 主要內容區域 */}
            <div className={styles.container}>
                <h1>檔期管理</h1>
                <div className={styles.cardGrid}>
                    {/* 顯示電影卡片 */}
                    {movies.map(movie => (
                        <div key={movie.id} className={styles.card} onClick={() => handleCardClick(movie)}>
                            <img src={movie.img} alt={movie.title} />
                            <h3>{movie.title}</h3>
                            <p>上映日期: {movie.date}</p>
                            <p>{movie.status ? '上架電影' : '下架電影'}</p>
                        </div>
                    ))}
                </div>

                {/* 新增電影按鈕 */}
                <button onClick={() => setSelectedMovie(null) || setShowModal(true)} className={styles.addButton}>新增</button>

                {/* 模態框顯示區域 */}
                {showModal && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modal}>
                            <h2>{selectedMovie ? '電影詳細資訊' : '新增電影'}</h2>
                            <input type="text" name="title" placeholder="標題" value={newMovie.title} onChange={handleInputChange} />
                            <input type="text" name="director" placeholder="導演" value={newMovie.director} onChange={handleInputChange} />
                            <input type="text" name="actor" placeholder="演員" value={newMovie.actor} onChange={handleInputChange} />
                            <textarea name="description" placeholder="電影簡介" value={newMovie.description} onChange={handleInputChange} />
                            <input type="text" name="genre" placeholder="類別" value={newMovie.genre} onChange={handleInputChange} />
                            <input type="text" name="duration" placeholder="時長" value={newMovie.duration} onChange={handleInputChange} />
                            <input type="date" name="date" value={newMovie.date} onChange={handleInputChange} />
                            <input type="file" onChange={handleImageUpload} />
                            <select name="status" value={newMovie.status} onChange={handleInputChange}>
                                <option value="TRUE">上架電影</option>
                                <option value="FALSE">下架電影</option>
                            </select>
                            <button onClick={saveUpdatedMovie}>保存</button>
                            <button onClick={() => setShowModal(false)}>關閉</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScheduleManagement;

