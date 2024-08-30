import React, { useState, useEffect } from 'react';
import './area.css';

const Area = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [remainingSeats, setRemainingSeats] = useState({});
    // const [remainingSeats, setRemainingSeats] = useState({ A: 20, B: 15, C: 15, D: 30, E: 20 });
    const [reservedSeats, setReservedSeats] = useState([]);
     // 定義每個區域的座位價格
    const seatPrices = {
      A: 300,
      B: 250,
      C: 250,
      D: 200,
      E: 150
    };

    useEffect(() => {
      // remaining seats Fetch
      fetch('http://localhost:8080/api/v1/seats')
          .then(response => response.json())
          .then(data => setRemainingSeats(data))
          .catch(error => console.error('Error fetching remaining seats:', error));

      // reserved seats Fetch
        fetch('http://localhost:8080/api/v1/seats')
        .then(response => response.json())
        .then(data => {
          const seatIds = data.map(seat => seat.seatId);
          setReservedSeats(seatIds);
        })
        .catch(error => console.error('Error fetching reserved seats:', error));
    }, []);
  
    const showSeats = (section) => {
        setSelectedSection(section); // 先設置區域
        setModalVisible(true); // 然後顯示模態
    };

    const toggleSeatSelection = (seatId) => {
        setSelectedSeats((prevSelectedSeats) => {
          const index = prevSelectedSeats.indexOf(seatId);
          let newSelectedSeats;
          if (index > -1) {
            newSelectedSeats = prevSelectedSeats.filter((seat) => seat !== seatId);
            setRemainingSeats((prevRemainingSeats) => ({
              ...prevRemainingSeats,
              [selectedSection]: prevRemainingSeats[selectedSection] + 1
            }));
          } else {
            newSelectedSeats = [...prevSelectedSeats, seatId];
            setRemainingSeats((prevRemainingSeats) => ({
              ...prevRemainingSeats,
              [selectedSection]: prevRemainingSeats[selectedSection] - 1
            }));
          }
          return newSelectedSeats;
        });
    };
  
    const confirmSeats = () => {
        if (selectedSeats.length > 0) {
          sessionStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
          alert(`確認座位: ${selectedSeats.join('、')}`);
          setModalVisible(false);
        }
    };
      
    const checkoutSeats = () => {
        if (selectedSeats.length > 0) {
          // 計算總金額
          const totalAmount = selectedSeats.reduce((total, seatId) => {
            const section = seatId[0]; // 座位ID的第一個字母代表區域
            return total + seatPrices[section];
          }, 0);

           // 組裝要傳送至後端的資料
          const payload = {
            seats: selectedSeats,
            amount: totalAmount,
            cinemaId: 1,  // 這裡假設使用的是cinemaId 1，根據你的需求進行調整
            movieId: 1,   // 這裡假設使用的是movieId 1，根據你的需求進行調整
          };

          // 使用 Fetch API 傳送資料到後端
          fetch('http://localhost:8080/api/v1/tickets', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
          })
          .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
              alert(`座位確認成功！您的座位為: ${selectedSeats.join(' 、 ')}\n總金額為: ${totalAmount} 元`);
              window.location.href = 'https://httpbin.org/'; // 結帳成功後導向的頁面
          })
          .catch(error => {
            console.error('Error saving tickets:', error);
            alert('座位儲存失敗，請稍後再試。');
          });
        } else {
          alert('您尚未選擇座位，請重新選擇。');
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };
      
    const handleModalClick = (event) => {
        if (event.target === event.currentTarget) {
          setModalVisible(false);
        }
    };

    const renderSeats = () => {
      // const reservedSeats = ['A1-1', 'A1-2', 'A1-3', 'A1-4']; // 從後端獲取
  
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
  
    return (
      <div className="seating-chart">
        <div className="stage">電影布幕</div>
        <div className="section section-a" onClick={() => showSeats('A')}>A區</div>
        <div className="section section-b" onClick={() => showSeats('B')}>B區</div>
        <div className="section section-c" onClick={() => showSeats('C')}>C區</div>
        <div className="seat-info">
          <h3>剩餘座位及價格</h3>
          <ul>
            <li>A區 - $300: 剩餘 {remainingSeats.A} 席</li>
            <li>B區 - $250: 剩餘 {remainingSeats.B} 席</li>
            <li>C區 - $250: 剩餘 {remainingSeats.C} 席</li>
            <li>D區 - $200: 剩餘 {remainingSeats.D} 席</li>
            <li>E區 - $150: 剩餘 {remainingSeats.E} 席</li>
          </ul>
        </div>
        <div className="section section-d" onClick={() => showSeats('D')}>D區</div>
        <div className="section section-e" onClick={() => showSeats('E')}>E區</div>
        <div className="checkout-container">
            <button className="checkout-button" onClick={checkoutSeats}>結帳去</button>
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
