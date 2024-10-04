import React from "react";
import { Link } from 'react-router-dom';  // 使用 React Router 的 Link 元件
import styles from '../styles/footer.module.css';
import fb from '../assets/fbimg.png';
import twitter from '../assets/twitterimg.png';
import linkedin from '../assets/linkedinimg.png';
import insta from '../assets/instaimg.png';

const FooterIn = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.sbFooter + " " + styles.sectionPadding}>
                <div className={styles.sbFooterLinks}>
                    <div className={styles.sbFooterLinksDiv}>
                        <h3>關於我們</h3>
                        <p>營業人名稱：華盛頓影城股份有限公司台北分公司</p>
                        <p>統一編號：80412345</p>
                        <p>地址：台北市大安區建國南路二段231號</p>
                        <p>電話：02-2700-5858</p>
                    </div>

                    <div className={styles.sbFooterLinksDiv}>
                        <h3>相關資訊</h3>
                        <Link to="/AboutPageIn" className={styles.link}>
                            <p>影院介紹</p>
                        </Link>
                        <Link to="/press" className={styles.link}>
                            <p>客服信箱</p>
                        </Link>
                        <Link to="/career" className={styles.link}>
                            <p>會員規章</p>
                        </Link>
                        <Link to="/contact" className={styles.link}>
                            <p>常見問題</p>
                        </Link>
                    </div>

                    <div className={styles.sbFooterLinksDiv}>
                        <h4>我們的社群</h4>
                        <div className={styles.socialMedia}>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <img src={fb} alt="Facebook" />
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                <img src={twitter} alt="Twitter" />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                <img src={linkedin} alt="LinkedIn" />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <img src={insta} alt="Instagram" />
                            </a>
                        </div>
                    </div>
                </div>

                <hr />
            </div>
        </div>
    );
}

export default FooterIn;

