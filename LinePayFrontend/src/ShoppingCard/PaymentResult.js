import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function PaymentResult() {
    const [seatNames, setSeatNames] = useState([]);
    const location = useLocation();
    
    // 提取 URL 中的參數
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get('orderId');
    const transactionId = searchParams.get('transactionId');

    useEffect(() => {
        // 取得 orderId 後，該座位會進行反灰且不可點擊
        if (orderId) {
            // 發送請求到後端 API
            fetch(`http://localhost:8080/api/SeatEntity/${orderId}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Fetched data:', data);
                    // 假設後端返回的是座位名稱
                    const seatNames = data.packages.flatMap(pkg => 
                        pkg.products.map(product => product.name)
                    );
                    setSeatNames(seatNames);
                })
                .catch(error => console.error('Error fetching order:', error));
        }
    }, [orderId]);

    return (
        <div className="PaymentResult">
            <h1>已完成訂單</h1>
            <h2>交易 ID: {transactionId}</h2>
            <h3>訂單 ID: {orderId}</h3>
            <h4>已訂座位:</h4>
            <ul>
                {seatNames.map((seat, index) => (
                    <li key={index}>{seat}</li>
                ))}
            </ul>
        </div>
    );
}
