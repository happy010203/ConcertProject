// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { CartContext } from '../CartContext';
// import styles from '../styles/Checkout.module.css'; // 引入 CSS 模組

// export default function CheckOutIn() {
//     const { cartItems, removeCartItem } = useContext(CartContext);
//     const navigate = useNavigate();
//     const cartEmpty = cartItems.length <= 0;
//     const grandTotal = cartItems.reduce((total, item) => {
//         return total + (item.hall.price * item.quantity);
//     }, 0);
//     const freeFood = 350;

//     const payment = async () => {
//         try {
//             const response = await fetch('http://localhost:8443/movie/ecpay/checkout', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     userId: localStorage.getItem('userid'),
//                     amount: grandTotal,
//                     description: cartItems.map(item => item.seatNumbers.join(', ')).join('; '),
//                     itemName: cartItems.map(item => item.movie.title).join('; '),
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error('網路響應錯誤');
//             }

//             const formHtml = await response.text();
//             console.log('Received ECPay HTML:', formHtml); // 檢查返回的 HTML
//             navigate('/ecpay', { state: { ecpayHTML: formHtml } });
//         } catch (error) {
//             console.error('結帳時發生錯誤：', error);
//         }
//     };

//     return (
//         <div className={styles.pageWrapper}>
//             <h1>您的購物車</h1>

//             {cartEmpty ? (
//                 <div className={styles.emptyCartMessage}>
//                     <Link to="/MovieList">
//                         <a>購物車為空</a><br />
//                         <a>前往購票吧</a>
//                     </Link>
//                 </div>
//             ) : (
//                 <div className={styles.cartContainer}>
//                     <div id={styles.cartSection}>
//                         {/* 產品列表 */}
//                         {cartItems.map(item => (
//                             <div className={styles.cartItemCard} key={item.movie.id}>
//                                 <img className={styles.img} src={item.movie.img} alt={item.movie.title} width={200} />
//                                 <div className={styles.textContent}>
//                                     <p>電影名稱: {item.movie.title}</p>
//                                     <p>放映日期: {item.showDate ? item.showDate : '未指定日期'}</p>
//                                     <p>放映時間: {item.showtime ? item.showtime : '未指定時間'}</p>
//                                     <p>{item.hall.hall_type} {item.hall.hall_number}廳</p>
//                                     <p>價格: {item.hall.price}</p>
//                                     <p>數量: {item.quantity}</p>
//                                     <p>座位: {item.seatNumbers.join(', ')}</p>
//                                 </div>
//                                 <div className={styles.deleteButtonContainer}>
//                                     <button
//                                         className={styles.deleteButton}
//                                         onClick={() => removeCartItem(item.movie.id)} // 調用 removeCartItem 函數
//                                     >
//                                         刪除
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     <div id={styles.checkoutSection}>
//                         <div>總價一共：{grandTotal}元</div>
//                         {grandTotal >= freeFood ? (
//                             <div>滿${freeFood}贈送免費爆米花</div>
//                         ) : (
//                             <div>
//                                 滿${freeFood}贈送免費爆米花<br />
//                                 還差${freeFood - grandTotal}
//                             </div>
//                         )}
//                         <button className={styles.checkoutButton} onClick={payment}>結帳</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }


import React, { useContext, useState } from 'react';
import Titles from './Titles'
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext';
import styles from '../styles/Checkout.module.css'; // 引入 CSS 模組

export default function CheckOutIn() {
    const { cartItems, removeCartItem } = useContext(CartContext);
    const navigate = useNavigate();
    const cartEmpty = cartItems.length <= 0;
    const grandTotal = cartItems.reduce((total, item) => {
        return total + (item.hall.price * item.quantity);
    }, 0);
    const freeFood = 350;
    const orderNumber = `ORD-${new Date().getTime()}`;

    // 使用 useState 管理 savedOrderId 和顯示 LinePay 按鈕的狀態
    const [savedOrderId, setSavedOrderId] = useState(null);
    const [showLinePayButton, setShowLinePayButton] = useState(false);

    const handleCheckout = async () => {

        const token = localStorage.getItem('token');

        // 檢查是否已登入
        if (!token) {
            alert('請先登入!');
            navigate('/login'); // 跳轉到登入頁面
            return; // 停止執行結帳邏輯
        }

        const totalAmount = cartItems.reduce((total, item) => {
            return total + item.hall.price * item.quantity;
        }, 0);

        const packages = cartItems.map(item => ({
            name: item.movie.title,  // 存進 productPackageForm 的 name
            amount: item.hall.price * item.quantity,  // 存進 productPackageForm 的 amount
            products: item.seatNumbers.map(seat => ({
                name: seat,  // 存進 productForm 的 name
                quantity: item.quantity,  // 存進 productForm 的 quantity
                price: item.hall.price  // 存進 productForm 的 price
            }))
        }));

        const checkoutRequest = {
            amount: totalAmount,  // 存進 checkoutPaymentRequestForm 的 amount
            orderId: orderNumber,  // 存進 checkoutPaymentRequestForm 的 orderId
            currency: 'TWD',  // 假設是台幣
            confirmUrl: "https://www.google.com.tw", //先暫設為google
            // confirmUrl: "http://localhost:3000/LinepayPaymentResult",
            packages: packages
        };

        // 發送 POST 請求到後端
        fetch('http://localhost:8443/movie/checkout/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(checkoutRequest),
        })
            .then(response => response.json())
            .then(data => {
                console.log('訂單保存成功:', data);
                setSavedOrderId(data.orderId);  // 使用 useState 更新 orderId
                setShowLinePayButton(true);  // 顯示 LinePay 按鈕
                alert(`訂單已生成，訂單編號：${data.orderId}`);
            })
            .catch((error) => {
                console.error('錯誤:', error);
            });
    };

    // 資料發送到LinePay
    const LinePayHandleCheckout = () => {
        if (!savedOrderId) {
            alert('請先確認結帳！');
            return;
        }

        // 第一步：取得結帳細節
        fetch(`http://localhost:8443/movie/checkout/details/${savedOrderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('取得結帳細節:', data)

                // 第二步：把取得的資料送到 LinePay 進行付款
                return fetch('http://localhost:8443/movie/checkout/payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),  // 將取得的結帳資料發送到付款API
                });
            })
            .then(response => response.json())
            .then(paymentData => {
                console.log('LinePay 付款處理結果:', paymentData);

                // 將 response 字串解析為 JSON 物件
                const responseInfo = JSON.parse(paymentData.response);

                // 根據解析後的資料進行跳轉或其他動作
                if (responseInfo.info && responseInfo.info.paymentUrl && responseInfo.info.paymentUrl.web) {
                    window.location.href = responseInfo.info.paymentUrl.web;  // 跳轉到 LinePay 支付頁面
                } else {
                    alert('付款失敗');
                }
            })
            .catch(error => {
                console.error('錯誤:', error);
            });

    }

    return (
        <div className={styles.checkoutPageWrapper}>
            <Titles mainTitle={"您的購物車"} />

            {
                cartEmpty &&
                <div className={styles.checkoutEmptyCartMessage}>
                    <Link to="/">
                        <a>購物車為空</a><br />
                        <a>前往購票吧</a>
                    </Link>
                </div>
            }

            {
                !cartEmpty &&
                <div className={styles.checkoutCartContainer}>
                    <div id={styles.checkoutCartSection}>
                        {/* 產品列表 */}
                        {cartItems.map(item => (
                            <div className={styles.checkoutCartItemCard} key={item.movie.movie_id}>
                                <img className={styles.checkoutImg} src={process.env.PUBLIC_URL + "/image/" + item.movie.img} alt={item.movie.title} width={200} />
                                <div className={styles.checkoutTextContent}>
                                    <p>電影名稱: {item.movie.title}</p>
                                    {/* 確認 showDate 存在後再顯示日期 */}
                                    <p>放映日期: {item.showDate ? item.showDate : '未指定日期'}</p>
                                    <p>放映時間: {item.showtime ? item.showtime : '未指定時間'}</p> {/* 如果需要顯示場次時間 */}
                                    <p>{item.hall.hall_type} {item.hall.hall_number}廳</p>
                                    <p>價格: {item.hall.price}</p>
                                    <p>數量: {item.quantity}</p>
                                    <p>座位: {item.seatNumbers.join(', ')}</p> {/* 顯示座位號 */}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div id={styles.checkoutCheckoutSection}>
                        {/* 價錢總數 */}
                        <div>總價一共：{grandTotal}元</div>
                        {
                            /* 免費送爆米花 */
                            grandTotal >= freeFood ?
                                <div>滿${freeFood}贈送免費爆米花</div> :
                                <div>
                                    滿${freeFood}贈送免費爆米花<br />
                                    還差${freeFood - grandTotal}</div>
                        }
                        <button className={styles.checkoutCheckoutButton} onClick={handleCheckout}>確認結帳</button>

                        {/* 只有當 showLinePayButton 為 true 時顯示 LinePay 按鈕 */}
                        {showLinePayButton && (
                            <button className={styles.checkoutLinePaycheckoutButton} onClick={LinePayHandleCheckout}>LinePay結帳</button>
                        )}
                    </div>
                </div>
            }
        </div>
    );

}