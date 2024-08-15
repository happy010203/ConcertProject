import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Body from './body/body'; // 頁面主體
import Footer from './footer/footer'; // 頁尾
import Header from './header/header'; // 頁頭
import reportWebVitals from './reportWebVitals'; // 性能報告
import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles.css';

// 渲染應用程式的主要進入點
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    {/* 頁頭組件 */}
    <Header />
    {/* 主體組件 */}
    <Body />
    {/* 頁尾組件 */}
    <Footer />

  </React.StrictMode>
);

// 性能報告
reportWebVitals();

