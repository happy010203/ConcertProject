import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './area.css';
import QuantityBtn from './QuantityBtn'


const Area = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movieInfo, setMovieInfo] = useState([]);
  const [remainingSeats, setRemainingSeats] = useState({ A: 20, B: 15, C: 15, D: 30, E: 20 });
  const [reservedSeats, setReservedSeats] = useState([]);
  const { showtime_id } = useParams(); // 使用 useParams 來獲取 showtime_id

  

  const totalSeats = { A: 20, B: 15, C: 15, D: 30, E: 20 };

  
  useEffect(() => {
    //用 showtime_id 提取電影資訊 API
    const fetchMovieInfo = fetch(`http://localhost:8080/api/showtimes/area/${showtime_id}`)
      .then(response => response.json());
    //用 showtime_id 提取電影座位API
    const fetchSeatInfo = fetch(`http://localhost:8080/api/SeatEntity/seatsResearch/${showtime_id}`)
      .then(response => response.json());
  
    Promise.all([fetchMovieInfo, fetchSeatInfo])
      .then(([movieData, seatData]) => {
        console.log("Fetched movie info:", movieData);
        setMovieInfo(movieData); // 設置電影資訊
  
        // 處理座位數據
        const reserved = seatData
          .filter(seat => !seat.seatAvailability)
          .map(seat => seat.seatNumber);
        setReservedSeats(reserved);
  
        const newRemainingSeats = { ...totalSeats };
        reserved.forEach(seat => {
          const section = seat.charAt(0);
          if (newRemainingSeats[section] !== undefined) {
            newRemainingSeats[section] -= 1;
          }
        });
        setRemainingSeats(newRemainingSeats);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, [showtime_id]);

  //加入三元，在等待資料渲染時，先預設為0。
  const seatPrices = {
    A: movieInfo.hall ? movieInfo.hall.price : 0,
    B: movieInfo.hall ? movieInfo.hall.price : 0,
    C: movieInfo.hall ? movieInfo.hall.price : 0,
    D: movieInfo.hall ? movieInfo.hall.price : 0,
    E: movieInfo.hall ? movieInfo.hall.price : 0
  };

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
        const isReserved = reservedSeats.includes(seatId.trim());  // 判斷該座位是否已被預訂
        // console.log(`SeatId: "${seatId}" vs Reserved Seats:`, reservedSeats);

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
    <div>
      <div className="">
        {movieInfo?.movie && movieInfo?.hall ? (
          <div className="">
            <img className='img' src={process.env.PUBLIC_URL + "/image/" + movieInfo.movie.img} alt={movieInfo.movie.title} width={200} />
            <p className="">片名：{movieInfo.movie.title}</p>
            <p className="">{movieInfo.showDate?.show_date}</p>
            <p className="">{movieInfo.hall.hall_type}</p>
            <p className="">{movieInfo.hall.hall_number} 廳</p>
            <p className="">售價：{movieInfo.hall.price}</p>
          </div>
        ) : (
          <p>載入中...</p> // 可以顯示載入中的提示
        )}
      </div>
  
      <h1>請選擇座位</h1>
      <div className="seating-chart">
        <div className="stage">電影布幕</div>
        <div className="section section-a" onClick={() => showSeats('A')}>A區</div>
        <div className="section section-b" onClick={() => showSeats('B')}>B區</div>
        <div className="section section-c" onClick={() => showSeats('C')}>C區</div>
        <div className="seat-info">
          <h3>剩餘座位</h3>
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
        {/* <div className="checkout-container">
        </div> */}
  
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
      <QuantityBtn showtimeInfo={movieInfo} selectedSeats={selectedSeats} />
    </div>
  );
  
};

export default Area;

