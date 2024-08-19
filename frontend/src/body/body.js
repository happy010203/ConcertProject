// 引入 React 和相關資源
import React, { useEffect, useState } from "react"; // 使用 useEffect 和 useState 來管理和處理狀態
import styles from './body.module.css'; // 引入自定義的 CSS 模組
import Slider from "react-slick"; // 引入 react-slick 用於圖片輪播
import "slick-carousel/slick/slick.css"; // 引入 slick-carousel 的基礎樣式
import "slick-carousel/slick/slick-theme.css"; // 引入 slick-carousel 的主題樣式

// 自定義的前進箭頭樣式
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className} // 自定義樣式
            style={{ ...style, display: "block", background: "#00aced" }} // 設定箭頭的樣式
            onClick={onClick} // 點擊事件處理函數
        />
    );
}

// 自定義的後退箭頭樣式
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className} // 自定義樣式
            style={{ ...style, display: "block", background: "#00aced" }} // 設定箭頭的樣式
            onClick={onClick} // 點擊事件處理函數
        />
    );
}

const Body = () => {
    // 使用 useState 來管理購票資訊和最新消息的狀態
    const [tickets, setTickets] = useState([]); // 初始狀態為空數組
    const [news, setNews] = useState([]); // 初始狀態為空數組

    // 使用 useEffect 在組件加載時從後端 API 獲取數據
    useEffect(() => {
        // 從後端 API 獲取購票資訊的數據
        fetch('https://api.example.com/tickets')
            .then(response => response.json()) // 將回應轉換為 JSON 格式
            .then(data => setTickets(data)); // 將數據存入 tickets 狀態

        // 從後端 API 獲取最新消息的數據
        fetch('https://api.example.com/news')
            .then(response => response.json()) // 將回應轉換為 JSON 格式
            .then(data => setNews(data)); // 將數據存入 news 狀態
    }, []); // 空數組作為依賴項，確保此 effect 只在組件首次加載時執行

    // 輪播組件的設定參數
    const settings = {
        dots: true, // 顯示輪播圓點
        infinite: true, // 無限循環
        speed: 500, // 切換速度為 500 毫秒
        slidesToShow: 3, // 同時顯示 3 張圖片
        slidesToScroll: 1, // 每次滾動 1 張圖片
        autoplay: true, // 自動播放
        autoplaySpeed: 3000, // 自動播放間隔為 3 秒
        centerMode: true, // 使中心顯示的圖片居中
        nextArrow: <SampleNextArrow />, // 使用自定義的下一頁箭頭
        prevArrow: <SamplePrevArrow />, // 使用自定義的上一頁箭頭
    };

    return (
        <div className={styles.bodyDiv}> {/* 主體容器 */}
            {/* 最新消息區塊 */}
            <div className={styles.newsSection}>
                <h2>最新消息</h2> {/* 區塊標題 */}
                <Slider {...settings} className={styles.newsSlider}> {/* 輪播組件應用在最新消息區塊 */}
                    {news.map((item, index) => ( // 迭代 news 狀態數據
                        <div key={index} className={styles.newsItem}>
                            <img src={item.imgSrc} alt={item.text} /> {/* 顯示新聞圖片 */}
                            <div className={styles.newsInfo}>
                                <p>{item.text}</p> {/* 顯示新聞標題 */}
                                <p>地點: {item.location}</p> {/* 顯示新聞地點 */}
                                <p>時間: {item.time}</p> {/* 顯示新聞時間 */}
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            
            {/* 購票資訊區塊 */}
            <div className={styles.ticketSection}>
                <h2>購票資訊</h2> {/* 區塊標題 */}
                <Slider className={styles.ticketSlider}> {/* 輪播組件應用在購票資訊區塊 */}
                    {tickets.map((ticket, index) => ( // 迭代 tickets 狀態數據
                        <div key={index} className={styles.ticketItem}>
                            <a href={ticket.url} target="_blank" rel="noopener noreferrer"> {/* 購票連結 */}
                                <img src={ticket.imgSrc} alt={`${ticket.artist} 演唱會`} /> {/* 顯示歌手圖片 */}
                                <h3>{ticket.artist} 演唱會</h3> {/* 顯示歌手名稱 */}
                            </a>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Body; // 將 Body 組件匯出

