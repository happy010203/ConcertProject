import React, { useContext, useState } from 'react'
import { CartContext } from '../CartContext'
import './QuantityBtn.css'

export default function QuantityBtn({movieInfo}) {

    //讀取CartContext
    const {cartItems, setCartItems} =  useContext(CartContext)

    //購物車內有無該電影
    let movieIndexInCart = cartItems.findIndex((element)=>{
        //比較網址id方便傳遞參數
        return element.id === movieInfo.id
    })
    //findIndex
    //若在購物車內找到該產品，返回索引位置
    //該件產品若未加入購物車，返回 -1

    let [ numIncart, setNumIncart ] = useState(
        (movieIndexInCart === -1) ? 0 : cartItems[movieIndexInCart].quantity
    )

    //增加
    const handleAdd = () => {
        if(movieIndexInCart === -1){
            //購物車沒有該產品，在cartItems array中加新的element(object)
            setCartItems([ //生成新的array返回setCartItems
                {
                    id : movieInfo.id,
                    name : movieInfo.name,
                    image : movieInfo.image,
                    price : movieInfo.price,
                    quantity : 1
                },
                ...cartItems]
            )
        }else{
            //購物車有該產品，加個Quantity
            //newCartArray = 原本cartItems
            let newCartArray = [...cartItems]
            newCartArray[movieIndexInCart].quantity++
            setCartItems(newCartArray)
        }
        setNumIncart(numIncart + 1)
    }

    //減少
    const handleSubtract = () => {
        if(cartItems[movieIndexInCart].quantity===1){
            //購物車只剩一件，再減一為0的話，要刪去整個object
            let newCartArray = [...cartItems]
            //在產品index位刪除element
            newCartArray.splice(movieIndexInCart, 1)
            setCartItems(newCartArray)
        }else{
            //若購物車大於1件，則減quantity數字
            let newCartArray = [...cartItems]
            newCartArray[movieIndexInCart].quantity--
            setCartItems(newCartArray)
        }
        setNumIncart(numIncart - 1)
    }

    return (
        <div className="quantityBtnContainer">
            {
                (numIncart === 0) ?
                    <button className="button" onClick={handleAdd}>加入購物車</button> :
                    <div className="quantityControl">
                        <button className="button" onClick={handleSubtract}>-</button>
                        <span>{numIncart}件</span>
                        <button className="button" onClick={handleAdd}>+</button>
                    </div>
            }
        </div>
    )
}
