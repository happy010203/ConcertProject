import React from 'react';
import styles from '../styles/AboutPage.module.css';

const AboutPage = () => {
    return (
        <div className={styles.aboutContainer}>
            <h3>關於我們</h3>
            <p>營業人名稱：華盛頓影城股份有限公司台北分公司</p>
            <p>統一編號：80412345</p>
            <p>地址：台北市大安區建國南路二段231號</p>
            <p>電話：(02)2720-5678</p>
            <p>廳數：1廳</p>
            <p>座位數：1360席</p>
            <p>
                影城內12座影廳經過全新改造，包含了：全景式銀幕、4K高畫質放映設備、Dolby Atmos音效系統、Bose全方位環繞喇叭，以及1:2.35黃金比例影廳，為觀眾打造無與倫比的視聽饗宴。
            </p>
            <p>
                座椅方面則採用歐美風格雙扶手設計，配有商務艙等級的寬大座椅，並搭配符合人體工學的包覆式椅背，極大地提升了觀影的舒適度，讓每一位觀眾都能享受最頂級的電影體驗。
            </p>

            <h3>紐約電影城</h3>
            <div className={styles.theaterInfo}>
                <div className={styles.locationInfo}>
                    <h4>交通位置</h4>
                    <p>地址：台北市大安區建國南路二段231號</p>
                    <div className={styles.mapContainer}>
                        <iframe
                            title="Google Maps"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.238137532968!2d121.53551237566926!3d25.025991277821575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442aa29c2124e41%3A0x4c5bf7354c52fabf!2zMTA25Y-w5YyX5biC5aSn5a6J5Y2A5bu65ZyL5Y2X6Lev5LqM5q61MjMx6Jmf!5e0!3m2!1szh-TW!2stw!4v1724633072603!5m2!1szh-TW!2stw"
                            width="600"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AboutPage;