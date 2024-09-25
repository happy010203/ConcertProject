// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { CartContext } from '../CartContext';
// import styles from '../styles/Checkout.module.css'; // 引入 CSS 模組

// export default function CheckOut() {
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


import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext';
import styles from '../styles/Checkout.module.css'; // 引入 CSS 模組

export default function CheckOut() {
    const { cartItems, removeCartItem } = useContext(CartContext);
    const navigate = useNavigate();
    const cartEmpty = cartItems.length <= 0;
    const grandTotal = cartItems.reduce((total, item) => {
        return total + (item.hall.price * item.quantity);
    }, 0);
    const freeFood = 350;

    const placeOrder = async () => {
        const token = localStorage.getItem('token');
    
        // 檢查是否已登入
        if (!token) {
            alert('請先登入!');
            navigate('/login'); // 跳轉到登入頁面
            return; // 停止執行結帳邏輯
        }
    
        try {
            const response = await fetch('http://localhost:8443/movie/api/orders/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: localStorage.getItem('userid'),
                    amount: grandTotal,
                    description: cartItems.map(item => item.seatNumbers.join(', ')).join('; '),
                    itemName: cartItems.map(item => item.movie.title).join('; '),
                }),
            });
    
            if (!response.ok) {
                throw new Error('網路響應錯誤');
            }
    
            const orderDetails = await response.json();
            console.log('訂單詳情:', orderDetails);
    
            // 結帳完成後導航到 OrderList 頁面
            navigate('/OrderList');
        } catch (error) {
            console.error('結帳時發生錯誤：', error);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <h1>您的購物車</h1>

            {cartEmpty ? (
                <div className={styles.emptyCartMessage}>
                    <Link to="/MovieList">
                        <a>購物車為空</a><br />
                        <a>前往購票吧</a>
                    </Link>
                </div>
            ) : (
                <div className={styles.cartContainer}>
                    <div id={styles.cartSection}>
                        {/* 產品列表 */}
                        {cartItems.map(item => (
                            <div className={styles.cartItemCard} key={item.movie.id}>
                                <img className={styles.img} src={item.movie.img} alt={item.movie.title} width={200} />
                                <div className={styles.textContent}>
                                    <p>電影名稱: {item.movie.title}</p>
                                    <p>放映日期: {item.showDate ? item.showDate : '未指定日期'}</p>
                                    <p>放映時間: {item.showtime ? item.showtime : '未指定時間'}</p>
                                    <p>{item.hall.hall_type} {item.hall.hall_number}廳</p>
                                    <p>價格: {item.hall.price}</p>
                                    <p>數量: {item.quantity}</p>
                                    <p>座位: {item.seatNumbers.join(', ')}</p>
                                </div>
                                {/* <div className={styles.deleteButtonContainer}>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => removeCartItem(item.movie.id)} // 调用 removeCartItem 函数
                                    >
                                        刪除
                                    </button>
                                </div> */}
                            </div>
                        ))}
                    </div>

                    <div id={styles.checkoutSection}>
                        <div>總價一共：{grandTotal}元</div>
                        {grandTotal >= freeFood ? (
                            <div>滿${freeFood}贈送免費爆米花</div>
                        ) : (
                            <div>
                                滿${freeFood}贈送免費爆米花<br />
                                還差${freeFood - grandTotal}
                            </div>
                        )}
                        <button className={styles.checkoutButton} onClick={placeOrder}>結帳</button>
                    </div>
                </div>
            )}
        </div>
    );
}