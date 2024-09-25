import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // 主應用組件
import reportWebVitals from './reportWebVitals';  // 測量性能

// 渲染應用到 DOM 的根元素
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 選擇性地測量性能
reportWebVitals();