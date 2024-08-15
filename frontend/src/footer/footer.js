import React from "react";
// 引入 CSS 模組以使頁腳樣式作用於當前組件
import styles from './footer.module.css';

// 引入社交媒體圖標資源
import fb from '../assets/fbimg.png';
import twitter from '../assets/twitterimg.png';
import linkedin from '../assets/linkedinimg.png';
import insta from '../assets/instaimg.png';

const Footer = () => {
    return (
        <div className={styles.footer}>
            {/* 使用自定義類名應用頁腳整體樣式 */}
            <div className={styles.sbFooter + " " + styles.sectionPadding}>
                <div className={styles.sbFooterLinks}>
                    {/* "For Business" 區塊，包含多個鏈接 */}
                    <div className={styles.sbFooterLinksDiv}>
                        <h4>For Business</h4>
                        <a href="/employer" className={styles.link}>
                            <p>Employer</p>
                        </a>
                        <a href="/healthplan" className={styles.link}>
                            <p>Health Plan</p>
                        </a>
                        <a href="/individual" className={styles.link}>
                            <p>Individual</p>
                        </a>
                    </div>
                    {/* "Resources" 區塊，包含多個鏈接 */}
                    <div className={styles.sbFooterLinksDiv}>
                        <h4>Resources</h4>
                        <a href="/resources" className={styles.link}>
                            <p>Resources center</p>
                        </a>
                        <a href="/resources" className={styles.link}>
                            <p>Testimonials</p>
                        </a>
                        <a href="/resources" className={styles.link}>
                            <p>STV</p>
                        </a>
                    </div>
                    {/* "Partners" 區塊，包含單個鏈接 */}
                    <div className={styles.sbFooterLinksDiv}>
                        <h4>Partners</h4>
                        <a href="/employer" className={styles.link}>
                            <p>Swing Tech</p>
                        </a>
                    </div>
                    {/* "Company" 區塊，包含多個鏈接 */}
                    <div className={styles.sbFooterLinksDiv}>
                        <h4>Company</h4>
                        <a href="/about" className={styles.link}>
                            <p>About</p>
                        </a>
                        <a href="/press" className={styles.link}>
                            <p>Press</p>
                        </a>
                        <a href="/career" className={styles.link}>
                            <p>Career</p>
                        </a>
                        <a href="/contact" className={styles.link}>
                            <p>Contact</p>
                        </a>
                    </div>
                    {/* "Coming soon on" 區塊，展示社交媒體圖標 */}
                    <div className={styles.sbFooterLinksDiv}>
                        <h4>Coming soon on</h4>
                        <div className={styles.socialMedia}>
                            <p><img src={fb} alt="Facebook" /></p>
                            <p><img src={twitter} alt="Twitter" /></p>
                            <p><img src={linkedin} alt="LinkedIn" /></p>
                            <p><img src={insta} alt="Instagram" /></p>
                        </div>
                    </div>
                </div>

                {/* 分隔線 */}
                <hr />

                {/* 頁腳底部區塊，包含版權信息和條款鏈接 */}
                <div className={styles.sbFooterBelow}>
                    <div className={styles.sbFooterCopyright}>
                        <p>@{new Date().getFullYear()} CodeInn. All rights reserved.</p>
                    </div>
                    <div className={styles.sbFooterBelowLinks}>
                        <a href="/terms" className={styles.link}><div><p>Terms & Conditions</p></div></a>
                        <a href="/privacy" className={styles.link}><div><p>Privacy</p></div></a>
                        <a href="/security" className={styles.link}><div><p>Security</p></div></a>
                        <a href="/cookie" className={styles.link}><div><p>Cookie Declaration</p></div></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
