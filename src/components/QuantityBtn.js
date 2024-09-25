import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/QuantityBtn.module.css'; // 導入 CSS 模組

export default function QuantityBtn({ showtimeInfo, selectedSeats }) {
    // 讀取 CartContext
    const { cartItems, setCartItems } = useContext(CartContext);

    const navigate = useNavigate();
    // 購物車內有無該場次
    let showtimeIndexInCart = cartItems.findIndex((element) => {
        return element.showtime_id === showtimeInfo.showtime_id;  // 比較 showtime_id
    });

    // 點擊按鈕時更新購物車或結帳
    const handleButtonClick = () => {
        console.log('已選擇的座位:', selectedSeats);
        console.log('當前購物車內容:', cartItems);
        console.log('場次信息:', showtimeInfo);
        if (selectedSeats.length > 0) {
            const updatedCart = {
                showtime: showtimeInfo.show_time,
                seatNumbers: selectedSeats,
                quantity: selectedSeats.length,
                showDate: showtimeInfo.showDate.show_date,
                hall: showtimeInfo.hall,
                movie: showtimeInfo.movie,
            };

            console.log('更新後的購物車項目:', updatedCart); // 打印即將加入購物車的項目

            if (showtimeIndexInCart === -1) {
                // 如果購物車中沒有該場次，將其加入
                const newCart = [...cartItems, updatedCart];
                setCartItems(newCart);
                console.log('加入購物車後的內容:', newCart); // 打印新的購物車內容
            } else {
                // 如果購物車中已經有該場次，更新數量和座位信息
                const newCartArray = [...cartItems];
                newCartArray[showtimeIndexInCart] = updatedCart;
                setCartItems(newCartArray);
                console.log("更新購物車: ", newCartArray);
            }

            // 計算總金額並顯示成功訊息
            const totalAmount = calculateTotalAmount();
            console.log('總金額:', totalAmount);  // 打印總金額
            alert(`座位確認成功！您的座位為: ${selectedSeats.join(' 、 ')}\n總金額為: ${totalAmount} 元`);

            // 根據 localStorage 是否有 token 決定導航路徑
            const token = localStorage.getItem('token');
            if (token) {
                navigate('/CheckOutIn');
            } else {
                navigate('/CheckOut');
            }
        } else {
            alert('您尚未選擇座位，請重新選擇。');
        }
    };

    // 計算總金額
    const calculateTotalAmount = () => {
        // 定義座位價格對照表，根據實際情況修改
        const seatPrices = {
            A: showtimeInfo.hall ? showtimeInfo.hall.price : 0,
            B: showtimeInfo.hall ? showtimeInfo.hall.price : 0,
            C: showtimeInfo.hall ? showtimeInfo.hall.price : 0,
            D: showtimeInfo.hall ? showtimeInfo.hall.price : 0,
            E: showtimeInfo.hall ? showtimeInfo.hall.price : 0
        };

        const totalAmount = selectedSeats.reduce((total, seatId) => {
            const section = seatId[0]; // 座位ID的第一個字母代表區域
            return total + (seatPrices[section] || 0);
        }, 0);

        return totalAmount;
    };

    

    return (
        <div className={styles.quantityBtnContainer}>
            <button className={styles.button} onClick={handleButtonClick}>
                加入購物車
            </button>
        </div>
    );
}
