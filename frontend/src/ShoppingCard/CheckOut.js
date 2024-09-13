import React, { useContext } from 'react'
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

    const handleCheckout = () => {
        // 使用當前時間生成訂單編號（精確到毫秒）
        const orderNumber = `ORD-${new Date().getTime()}`
        console.log("生成的訂單編號:", orderNumber)
        // 這裡可以添加後續處理，如發送訂單數據到後端等
        alert(`訂單已生成，訂單編號：${orderNumber}`)
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
                        <button className='checkoutButton' onClick={handleCheckout}>結帳</button>
                    </div>
                </div>
            }
        </div>
    )
}
