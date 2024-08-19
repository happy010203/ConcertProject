// 引入 React 和相關資源
import React, { useState } from 'react';
import styles from './header.module.css'; // 引入 CSS 模組
import search_icon from '../assets/search.png'; // 搜尋圖示
import sing_icon from '../assets/sing.png'; // Logo 圖片
import 'bootstrap/dist/css/bootstrap.min.css'; // 引入 Bootstrap 樣式

// 主 Header 組件
const Header = ({ events }) => {
    // 定義狀態以管理搜尋框的輸入值和搜尋結果
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);

    // 處理搜尋功能的函式
    const handleSearch = (query) => {
        setSearchQuery(query);

        // 篩選與搜尋查詢相關的事件
        const results = events.filter(event => 
            event.artist.toLowerCase().includes(query.toLowerCase()) ||
            event.location.toLowerCase().includes(query.toLowerCase()) ||
            event.time.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredEvents(results);
    };

    return (
        <div className={styles.headerST}>
            {/* Logo 圖片 */}
            <img src={sing_icon} alt="Logo" className={styles.logo} />

            {/* 導航列 */}
            <ul>
                <li>Home</li>
                <li>Products</li>
                <li>Features</li>
                <li>About</li>
            </ul>

            {/* 搜尋框 */}
            <div className={styles['search-box']}>
                {/* 當用戶在輸入框輸入文字時觸發 handleSearch */}
                <input 
                    type="text" 
                    placeholder='Search' 
                    value={searchQuery} 
                    onChange={(e) => handleSearch(e.target.value)} 
                />
                <img src={search_icon} alt="Search Icon" />
            </div>

            {/* User Actions: CART 和 MY ACCOUNT */}
            <div className={styles['user-actions']}>
                <a href=" " className="btn btn-outline-secondary ml-2">🛒 CART</a>
                <a href=" " className="btn btn-outline-secondary">👤 MY ACCOUNT</a>
            </div>

            {/* 顯示搜尋結果 */}
            {searchQuery && (
                <div className={styles['search-results']} /* 搜尋結果視窗的樣式 */>
                    <div className="modal-dialog-centered" /* 使模態視窗居中 */>
                        <div className="modal-content" /* Bootstrap 樣式，用於彈出視窗內容 */>
                            <div className="modal-header" /* Bootstrap 樣式，用於彈出視窗標題 */>
                                <h5 className="modal-title">搜尋結果：</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" /* Bootstrap 樣式，用於彈出視窗的主體 */>
                                <ul>
                                    {/* 根據搜尋結果生成列表項目 */}
                                    {filteredEvents.map((event, index) => (
                                        <li key={index}>
                                            <a href={event.url} target="_blank" rel="noopener noreferrer">
                                                <strong>{event.artist}</strong> - {event.location} - {event.time}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="modal-footer" /* Bootstrap 樣式，用於彈出視窗的底部 */>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;


