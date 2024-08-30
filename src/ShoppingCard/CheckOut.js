import React, { useContext } from 'react'
import Titles from './Titles'
import { Link } from 'react-router-dom'
import { CartContext } from '../CartContext'
import './Checkout.css'

export default function CheckOut() {

    let {cartItems} = useContext(CartContext)

    //購物車東西為0或小於0，便是true否則為false
    let cartEmpty = cartItems.length <= 0 ? true : false
    //計算購買數量與價格相乘，為總價格
    let grandTotal = cartItems.reduce((total, movie)=>{
        return total += movie.price * movie.quantity
    }, 0) //total初始值為0
    //滿多少錢送吃的設定
    const freeFood = 350

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
                        {cartItems.map(movie => (
                        <div className='cartItemCard' key={movie.id}>
                            <img className='img' src={process.env.PUBLIC_URL+"/image/"+movie.image} alt={movie.name} width={200}/>
                            <div className='textContent'>
                                <p>{movie.name}</p>
                                <p>價格: {movie.price}</p>
                                <p>數量: {movie.quantity}</p>
                                {/* <QuantityBtn movieInfo={MovieList} /> */}
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
                                滿${freeFood}贈送免費爆米花<br/>
                                還差${freeFood-grandTotal}</div>
                        }
                        <button className='checkoutButton'>結帳</button>
                    </div>
                </div>
            }
        </div>
    )
}
