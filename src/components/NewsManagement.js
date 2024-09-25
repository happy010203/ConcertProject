import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/NewsManagement.module.css';
import { Link, useNavigate } from 'react-router-dom';

const NewsManagement = () => {
    const [news, setNews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const [newNews, setNewNews] = useState({
        img: '',
        text: '',
        created_time: '',
    });
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    // 從後端獲取消息數據
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('請先登錄');
            navigate('/login');
            return;
        }

        axios.get('http://localhost:8443/movie/api/movie/news', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(response => {
            setNews(response.data);
        })
        .catch(error => {
            handleErrorResponse(error);
        });
    }, []);

    // 處理 API 錯誤
    const handleErrorResponse = (error) => {
        console.error('Error:', error);
        if (error.response && error.response.status === 401) {
            alert('Token 已過期或無效，請重新登錄');
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    // 顯示模態框並填充選定消息的信息
    const handleCardClick = (newsItem) => {
        setSelectedNews(newsItem);
        setNewNews({
            img: newsItem.img,
            text: newsItem.text,
            created_time: newsItem.created_time,
        });
        setShowModal(true);
    };

    // 處理輸入字段的更改
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewNews({ ...newNews, [name]: value });
    };

    // 處理圖像文件的上傳
    const handleImageUpload = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    // 保存更新後的消息信息
    const saveUpdatedNews = () => {
        if (!newNews.text) {
            alert('請確保所有字段都已填寫');
            return;
        }

        const formData = new FormData();
        if (file) {
            formData.append('file', file);
        }
        formData.append('text', newNews.text);
        formData.append('created_time', newNews.created_time);

        const token = localStorage.getItem('token');
        if (!token) {
            alert('請先登錄');
            navigate('/login');
            return;
        }

        const url = selectedNews 
            ? `http://localhost:8443/movie/api/admin/news/${selectedNews.id}/update` 
            : 'http://localhost:8443/movie/api/admin/add-news';
        const method = selectedNews ? 'put' : 'post';

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
            if (selectedNews) {
                setNews(news.map(newsItem =>
                    newsItem.id === selectedNews.id ? response.data : newsItem
                ));
            } else {
                setNews([...news, response.data]);
            }
            setShowModal(false);
        })
        .catch(error => {
            handleErrorResponse(error);
        });
    };

    return (
        <div>
            {/* 頂部導航欄 */}
            <div className={styles.headerST}>
                <ul>
                    <li><Link to="/schedule">檔期管理</Link></li>
                    <li><Link to="/news">消息管理</Link></li>
                    <li><Link to="/user_management">用戶管理</Link></li>
                    <li><Link to="/order">查詢訂單</Link></li>
                </ul>
            </div>

            {/* 主要內容區域 */}
            <div className={styles.container}>
                <h1>消息管理</h1>
                <div className={styles.cardGrid}>
                    {/* 顯示消息卡片 */}
                    {news.map(newsItem => (
                        <div key={newsItem.id} className={styles.card} onClick={() => handleCardClick(newsItem)}>
                            <img src={newsItem.img} alt={newsItem.text} />
                            <p>{newsItem.text}</p>
                        </div>
                    ))}
                </div>

                {/* 新增消息按鈕 */}
                <button onClick={() => setSelectedNews(null) || setShowModal(true)} className={styles.addButton}>新增</button>

                {/* 模態框顯示區域 */}
                {showModal && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modal}>
                            <h2>{selectedNews ? '編輯消息' : '新增消息'}</h2>
                            <input
                                type="file"
                                onChange={handleImageUpload}
                            />
                            <textarea
                                name="text"
                                value={newNews.text}
                                onChange={handleInputChange}
                                placeholder="消息內容"
                            ></textarea>
                            <div className={styles.modalButtons}>
                                <button onClick={saveUpdatedNews} className={styles.confirmButton}>保存</button>
                                <button onClick={() => setShowModal(false)} className={styles.cancelButton}>取消</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsManagement;
