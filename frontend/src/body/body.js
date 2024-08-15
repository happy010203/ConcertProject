// 引入 React 和相關資源
import React from "react";
import styles from './body.module.css'; // 引入自定義樣式
import S1 from '../assets/S1.jpeg';
import S2 from '../assets/S2.jpeg';
import S3 from '../assets/S3.jpeg';
import S4 from '../assets/S4.jpeg';
import S5 from '../assets/S5.jpeg';
import S6 from '../assets/S6.jpeg';
import S7 from '../assets/S7.jpeg';
import S8 from '../assets/S8.jpeg';
import Slider from "react-slick"; // 引入輪播組件
import "slick-carousel/slick/slick.css"; // 輪播樣式
import "slick-carousel/slick/slick-theme.css"; // 輪播主題樣式

// 模擬的購票資訊資料
const tickets = [
    { artist: '歌手A', url: '', imgSrc: S1 },
    { artist: '歌手B', url: '', imgSrc: S2 },
    { artist: '歌手C', url: '', imgSrc: S3 },
];

// 模擬的最新消息資料
const news = [
    { imgSrc: S1, text: '最新消息 1' },
    { imgSrc: S2, text: '最新消息 2' },
    { imgSrc: S3, text: '最新消息 3' },
    { imgSrc: S4, text: '最新消息 4' },
    { imgSrc: S5, text: '最新消息 5' },
    { imgSrc: S6, text: '最新消息 6' },
    { imgSrc: S7, text: '最新消息 7' },
    { imgSrc: S8, text: '最新消息 8' },
];

// 自定義的前進箭頭樣式
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

// 自定義的後退箭頭樣式
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
    // 輪播設定
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,  // 顯示三張圖片
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        centerMode: true,  // 使中心顯示圖片居中
        nextArrow: <SampleNextArrow />, // 自定義的下一頁箭頭
        prevArrow: <SamplePrevArrow />, // 自定義的上一頁箭頭
    };

    return (
        <div className={styles.bodyDiv}>
            {/* 最新消息區塊 */}
            <div className={styles.newsSection}>
                <h2>最新消息</h2>
                <Slider {...settings} className={styles.newsSlider}>
                    {news.map((item, index) => (
                        <div key={index} className={styles.newsItem}>
                            <img src={item.imgSrc} alt={item.text} />
                            <div className={styles.newsInfo}>
                                <p>{item.text}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            
            {/* 購票資訊區塊（未修改的部分） */}
            <div className={styles.ticketSection}>
                <h2>購票資訊</h2>
                <Slider  className={styles.ticketSlider}>
                    {tickets.map((ticket, index) => (
                        <div key={index} className={styles.ticketItem}>
                            <a href={ticket.url} target="_blank" rel="noopener noreferrer">
                                <img src={ticket.imgSrc} alt={`${ticket.artist} 演唱會`} />
                                <h3>{ticket.artist} 演唱會</h3>
                            </a>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Body;



