import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const EcpayPage = () => {
  const location = useLocation();
  const { ecpayHTML } = location.state || {}; // 從路由的 state 中接收 HTML 表單

  useEffect(() => {
    if (ecpayHTML) {
      console.log('Received ecpayHTML:', ecpayHTML); // 檢查返回的 HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = ecpayHTML; // 將 HTML 插入 DOM
      document.body.appendChild(tempDiv);
      
      // 確保 HTML 插入後立即顯示
      const form = tempDiv.querySelector('form'); // 找到表單
      console.log('Form:', form); // 確認表單元素
      if (form) {
        form.style.display = 'block'; // 確保表單可見
        form.submit(); // 自動提交表單
      } else {
        console.error('Form not found in the ecpayHTML');
      }
    }
  }, [ecpayHTML]); // 當 ecpayHTML 更新時觸發

  return (
    <div>
      {ecpayHTML ? (
        <p>正在處理支付，請稍候...</p>
      ) : (
        <p>載入支付頁面失敗，請重試。</p>
      )}
    </div>
  );
};

export default EcpayPage;
