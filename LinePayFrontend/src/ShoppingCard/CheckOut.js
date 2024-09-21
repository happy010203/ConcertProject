// 可串接linepay (備份)
// import React, { useContext } from 'react'
// import Titles from './Titles'
// import { Link } from 'react-router-dom'
// import { CartContext } from '../CartContext'
// import './Checkout.css'

// export default function CheckOut() {

//     let { cartItems } = useContext(CartContext)
//     //購物車東西為0或小於0，便是true否則為false
//     let cartEmpty = cartItems.length <= 0 ? true : false
//     //計算購買數量與價格相乘，為總價格
//     let grandTotal = cartItems.reduce((total, movie) => {
//         return total += movie.hall.price * movie.quantity
//     }, 0) //total初始值為0
//     //滿多少錢送吃的設定
//     const freeFood = 350
//     const orderNumber = `ORD-${new Date().getTime()}`;
//     let savedOrderId = null;  // 全局變數 orderId

//     const handleCheckout = () => {
//         const totalAmount = cartItems.reduce((total, item) => {
//             return total + item.hall.price * item.quantity;
//         }, 0);
    
//         const packages = cartItems.map(item => ({
//             name: item.movie.title,  // 存進 productPackageForm 的 name
//             amount: item.hall.price * item.quantity,  // 存進 productPackageForm 的 amount
//             products: item.seatNumbers.map(seat => ({
//                 name: seat,  // 存進 productForm 的 name
//                 quantity: item.quantity,  // 存進 productForm 的 quantity
//                 price: item.hall.price  // 存進 productForm 的 price
//             }))
//         }));
    
//         const checkoutRequest = {
//             amount: totalAmount,  // 存進 checkoutPaymentRequestForm 的 amount
//             orderId: orderNumber,  // 存進 checkoutPaymentRequestForm 的 orderId
//             currency: 'TWD',  // 假設是台幣
//             confirmUrl: "https://www.google.com.tw",
//             packages: packages
//         };
    
//         // 發送 POST 請求到後端
//         fetch('http://localhost:8080/checkout/save', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(checkoutRequest),
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('訂單保存成功:', data);
//             savedOrderId = data.orderId;  // 保存 orderId
//             alert(`訂單已生成，訂單編號：${savedOrderId}`);
//         })
//         .catch((error) => {
//             console.error('錯誤:', error);
//         });
//     };

//     // 資料發送到LinePay
//     const LinePayHandleCheckout = () => {
//         if (!savedOrderId) {
//             alert('請先確認結帳！');
//             return;
//         }
    
//         // 第一步：取得結帳細節
//         fetch(`http://localhost:8080/checkout/details/${savedOrderId}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log('取得結帳細節:', data)

//                 // 第二步：把取得的資料送到 LinePay 進行付款
//                 return fetch('http://localhost:8080/checkout/payment', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(data),  // 將取得的結帳資料發送到付款API
//                 });
//             })
//             .then(response => response.json())
//             .then(paymentData => {
//                 console.log('LinePay 付款處理結果:', paymentData);

//             // 將 response 字串解析為 JSON 物件
//             const responseInfo = JSON.parse(paymentData.response);
            
//             // 根據解析後的資料進行跳轉或其他動作
//             if (responseInfo.info && responseInfo.info.paymentUrl && responseInfo.info.paymentUrl.web) {
//                 window.location.href = responseInfo.info.paymentUrl.web;  // 跳轉到 LinePay 支付頁面
//             } else {
//                 alert('付款失敗');
//             }
//             })
//             .catch(error => {
//                 console.error('錯誤:', error);
//             });
//     }

//     return (
//         <div className="pageWrapper">
//             <Titles mainTitle={"您的購物車"} />

//             {
//                 cartEmpty &&
//                 <div className="emptyCartMessage">
//                     <Link to="/">
//                         <a>購物車為空</a><br />
//                         <a>前往購票吧</a>
//                     </Link>
//                 </div>
//             }

//             {
//                 !cartEmpty &&
//                 <div className="cartContainer">
//                     <div id='cartSection'>
//                         {/* 產品列表 */}
//                         {cartItems.map(item => (
//                             <div className='cartItemCard' key={item.movie.movie_id}>
//                                 <img className='img' src={process.env.PUBLIC_URL + "/image/" + item.movie.img} alt={item.movie.title} width={200} />
//                                 <div className='textContent'>
//                                     <p>電影名稱: {item.movie.title}</p>
//                                     {/* 確認 showDate 存在後再顯示日期 */}
//                                     <p>放映日期: {item.showDate ? item.showDate : '未指定日期'}</p>
//                                     <p>放映時間: {item.showtime ? item.showtime : '未指定時間'}</p> {/* 如果需要顯示場次時間 */}
//                                     <p>{item.hall.hall_type} {item.hall.hall_number}廳</p>
//                                     <p>價格: {item.hall.price}</p>
//                                     <p>數量: {item.quantity}</p>
//                                     <p>座位: {item.seatNumbers.join(', ')}</p> {/* 顯示座位號 */}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     <div id='checkoutSection'>
//                         {/* 價錢總數 */}
//                         <div>總價一共：{grandTotal}元</div>
//                         {
//                             /* 免費送爆米花 */
//                             grandTotal >= freeFood ?
//                                 <div>滿${freeFood}贈送免費爆米花</div> :
//                                 <div>
//                                     滿${freeFood}贈送免費爆米花<br />
//                                     還差${freeFood - grandTotal}</div>
//                         }
//                         <button className='checkoutButton' onClick={handleCheckout}>確認結帳</button>
//                         <button className='LinePaycheckoutButton' onClick={LinePayHandleCheckout}>LinePay結帳</button>
//                     </div>
//                 </div>
//             }
//         </div>
//     )
// }

import React, { useContext, useState } from 'react'
import Titles from './Titles'
import { Link } from 'react-router-dom'
import { CartContext } from '../CartContext'
import './Checkout.css'

export default function CheckOut() {

    let { cartItems } = useContext(CartContext)
    //購物車東西為0或小於0，便是true否則為false
    let cartEmpty = cartItems.length <= 0 ? true : false
    //計算購買數量與價格相乘，為總價格
    let grandTotal = cartItems.reduce((total, movie) => {
        return total += movie.hall.price * movie.quantity
    }, 0) //total初始值為0
    //滿多少錢送吃的設定
    const freeFood = 350
    const orderNumber = `ORD-${new Date().getTime()}`;
    
    // 使用 useState 管理 savedOrderId 和顯示 LinePay 按鈕的狀態
    const [savedOrderId, setSavedOrderId] = useState(null);
    const [showLinePayButton, setShowLinePayButton] = useState(false);

    const handleCheckout = () => {
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
            confirmUrl: "https://www.google.com.tw",
            packages: packages
        };
    
        // 發送 POST 請求到後端
        fetch('http://localhost:8080/checkout/save', {
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
        fetch(`http://localhost:8080/checkout/details/${savedOrderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('取得結帳細節:', data)

                // 第二步：把取得的資料送到 LinePay 進行付款
                return fetch('http://localhost:8080/checkout/payment', {
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
        <div className="pageWrapper">
            <Titles mainTitle={"您的購物車"} />

            {
                cartEmpty &&
                <div className="emptyCartMessage">
                    <Link to="/">
                        <a>購物車為空</a><br />
                        <a>前往購票吧</a>
                    </Link>
                </div>
            }

            {
                !cartEmpty &&
                <div className="cartContainer">
                    <div id='cartSection'>
                        {/* 產品列表 */}
                        {cartItems.map(item => (
                            <div className='cartItemCard' key={item.movie.movie_id}>
                                <img className='img' src={process.env.PUBLIC_URL + "/image/" + item.movie.img} alt={item.movie.title} width={200} />
                                <div className='textContent'>
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

                    <div id='checkoutSection'>
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
                        <button className='checkoutButton' onClick={handleCheckout}>確認結帳</button>
                        
                        {/* 只有當 showLinePayButton 為 true 時顯示 LinePay 按鈕 */}
                        {showLinePayButton && (
                            <button className='LinePaycheckoutButton' onClick={LinePayHandleCheckout}>LinePay結帳</button>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

