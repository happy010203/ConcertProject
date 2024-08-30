import React, { useState, useEffect } from 'react';
import './area.css';

const Area = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [remainingSeats, setRemainingSeats] = useState({ A: 20, B: 15, C: 15, D: 30, E: 20 });
    const [reservedSeats, setReservedSeats] = useState([]);
     // 定義每個區域的座位價格
    const seatPrices = {
      A: 300, B: 300, C: 300, D: 300, E: 300
    };

    //向後端伺服器發送請求以獲取剩餘座位和已預訂座位的資訊，並將這些資料儲存到 remainingSeats 和 reservedSeats 中。
    useEffect(() => {
      // 剩餘座位 remaining seats Fetch
      fetch('http://localhost:8080/api/v1/remainingSeat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ remainingSeats })  // 傳遞 remainingSeats 參數
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log("Received data:", data);
          // 這裡可以根據需要更新前端狀態，例如：
          setRemainingSeats({
            A: data.A_remainingSeats,
            B: data.B_remainingSeats,
            C: data.C_remainingSeats,
            D: data.D_remainingSeats,
            E: data.E_remainingSeats
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

      // 已預訂座位 reserved seats Fetch
      const sections = ['A', 'B', 'C', 'D', 'E'];
      const seatNumbers = [];

      sections.forEach(section => {
          for (let row = 1; row <= 5; row++) {  // 假設每個區域最多5行
              for (let col = 1; col <= 12; col++) {  // 假設每行最多12列
                  seatNumbers.push(`${section}${row}-${col}`);
              }
          }
      });

      fetch(`http://localhost:8080/api/v1/getSeatInfo?seatNumbers=${seatNumbers.join(',')}`)
          .then(response => response.json())
          .then(data => {
              if (data.success) {
                  data.list.forEach(seat => {
                    console.log("Seat Number:", seat.seatNumber);
                    console.log("Seat Availability:", seat.seatAvailability);
                  });

                  const reservedSeatsFromBackend = data.list
                    .filter(seat => seat.seatAvailability === false)
                    .map(seat => seat.seatNumber);
                  setReservedSeats(reservedSeatsFromBackend);
              } else {
                  console.log("No seats found or other error:", data.message);
              }
          })
          .catch(error => {
              console.error('Error:', error);
        });

    }, []);
  
    //顯示特定區域的座位。當使用者點擊某個區域時，會將所選區域儲存到 selectedSection，並顯示對應的模態框。
    const showSeats = (section) => {
        setSelectedSection(section); // 先設置區域
        setModalVisible(true); // 然後顯示模態
    };

    // 處理座位選擇與取消選擇
    // 此函數會根據座位是否已選擇來更新 selectedSeats 狀態
    const toggleSeatSelection = (seatId) => {
      setSelectedSeats((prevSelectedSeats) => {
          const index = prevSelectedSeats.indexOf(seatId);
          let newSelectedSeats;

          // 如果座位已經選擇，則將其從 selectedSeats 中移除
          if (index > -1) {
              newSelectedSeats = prevSelectedSeats.filter((seat) => seat !== seatId);
          } else {
              // 如果座位尚未選擇，則將其加入到 selectedSeats 中
              newSelectedSeats = [...prevSelectedSeats, seatId];
          }

          return newSelectedSeats; // 返回更新後的 selectedSeats 狀態
      });
    };

    //使用者確認座位選擇後執行。它會將選擇的座位儲存在 sessionStorage 中，然後隱藏模態框。
    const confirmSeats = () => {
        if (selectedSeats.length > 0) {
          sessionStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
          alert(`確認座位: ${selectedSeats.join('、')}`);
          setModalVisible(false);
        }
    };
    
    //在使用者點擊 "前往購物車" 按鈕時執行。計算所選座位的總金額，並將資料（包括座位資訊和總金額）發送到後端伺服器。如果請求成功，會顯示確認訊息並將使用者導向到結帳頁面；如果失敗，則顯示錯誤訊息。
    const checkoutSeats = () => {
        if (selectedSeats.length > 0) {
          // 計算總金額
          const totalAmount = selectedSeats.reduce((total, seatId) => {
            const section = seatId[0]; // 座位ID的第一個字母代表區域
            return total + seatPrices[section];
          }, 0);

          // 顯示成功訊息並導向至指定頁面
          alert(`座位確認成功！您的座位為: ${selectedSeats.join(' 、 ')}\n總金額為: ${totalAmount} 元`);
          window.location.href = 'https://httpbin.org/'; // 結帳成功後導向的頁面
          } else {
              alert('您尚未選擇座位，請重新選擇。');
          }
    };

    //關閉模態框
    const closeModal = () => {
        setModalVisible(false);
    };
    
    //當使用者點擊模態框外部區域時，這個函式會檢查點擊事件是否發生在模態框本身，如果是，則關閉模態框。
    const handleModalClick = (event) => {
        if (event.target === event.currentTarget) {
          setModalVisible(false);
        }
    };

    //根據使用者選擇的區域動態生成座位排版。它會根據選擇的區域設定座位行列數，並為每個座位設置樣式和點擊事件。
    const renderSeats = () => {
 
      let rows, cols;
      switch (selectedSection) {
        case 'A':
          rows = 5;
          cols = 4;
          break;
        case 'B':
        case 'C':
          rows = 5;
          cols = 3;
          break;
        case 'D':
          rows = 3;
          cols = 10;
          break;
        case 'E':
          rows = 2;
          cols = 12;
          break;
        default:
          return null;
      }
  
      const seatElements = [];
      for (let row = 1; row <= rows; row++) {
        const seatRow = [];
        for (let col = 1; col <= cols; col++) {
          const seatId = `${selectedSection}${row}-${col}`;
          const isReserved = reservedSeats.includes(seatId);
          seatRow.push(
            <div
              key={seatId}
              className={`seat ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
              style={isReserved ? { backgroundColor: '#ccc', cursor: 'not-allowed' } : {}}
              onClick={!isReserved ? () => toggleSeatSelection(seatId) : null}
            >
              {seatId}
            </div>
          );
        }
        seatElements.push(<div key={row} className="seat-row">{seatRow}</div>);
      }
      return seatElements;
    };
  
    //元件的 JSX 標記，定義了座位選擇界面的結構和樣式。包括區域選擇、剩餘座位資訊顯示、確認按鈕，以及動態生成的座位模態框。
    return (
      <div className="seating-chart">
        <div className="stage">電影布幕</div>
        <div className="section section-a" onClick={() => showSeats('A')}>A區</div>
        <div className="section section-b" onClick={() => showSeats('B')}>B區</div>
        <div className="section section-c" onClick={() => showSeats('C')}>C區</div>
        <div className="seat-info">
          <h3>剩餘座位及價格</h3>
          <ul>
            <li>A區 - 剩餘 {remainingSeats.A} 席</li>
            <li>B區 - 剩餘 {remainingSeats.B} 席</li>
            <li>C區 - 剩餘 {remainingSeats.C} 席</li>
            <li>D區 - 剩餘 {remainingSeats.D} 席</li>
            <li>E區 - 剩餘 {remainingSeats.E} 席</li>
          </ul>
        </div>
        <div className="section section-d" onClick={() => showSeats('D')}>D區</div>
        <div className="section section-e" onClick={() => showSeats('E')}>E區</div>
        <div className="checkout-container">
            <button className="checkout-button" onClick={checkoutSeats}>前往購物車</button>
        </div>
  
        {modalVisible && (
            <div className="modal" onClick={handleModalClick}>
                <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>{selectedSection}區座位</h2>
                <div className="seats">{renderSeats()}</div>
                <div id="selectedSeatsDisplay" className="selected-seats">
                    {selectedSeats.length > 0
                    ? `您選擇的座位為: ${selectedSeats.join(' 、 ')}`
                    : '您尚未選擇任何座位'}
                </div>
                <button className="confirm-button" onClick={confirmSeats}>確認</button>
                </div>
            </div>
        )}
      </div>
    )};
  
export default Area;

