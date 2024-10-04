import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/area.module.css';
import QuantityBtn from './QuantityBtn';

const Area = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movieInfo, setMovieInfo] = useState({});
  const [remainingSeats, setRemainingSeats] = useState({ A: 20, B: 15, C: 15, D: 30, E: 20 });
  const [reservedSeats, setReservedSeats] = useState([]);
  const { showtime_id } = useParams();

  const totalSeats = { A: 20, B: 15, C: 15, D: 30, E: 20 };

  useEffect(() => {
    const fetchMovieInfo = fetch(`http://localhost:8443/movie/api/movie/area/${showtime_id}`).then(response => response.json());
    const fetchSeatInfo = fetch(`http://localhost:8443/movie/api/movie/seatsResearch/${showtime_id}`).then(response => response.json());

    Promise.all([fetchMovieInfo, fetchSeatInfo])
      .then(([movieData, seatData]) => {
        console.log('Movie Data:', movieData);
        console.log('Seat Data:', seatData);
        setMovieInfo(movieData);

        const reserved = seatData.filter(seat => !seat.seatAvailability).map(seat => seat.seatNumber);
        setReservedSeats(reserved);

        const newRemainingSeats = { ...totalSeats };
        reserved.forEach(seat => {
          const section = seat.charAt(0);
          if (newRemainingSeats[section] !== undefined) {
            newRemainingSeats[section] -= 1;
          }
        });
        setRemainingSeats(newRemainingSeats);
        console.log('Remaining Seats:', newRemainingSeats);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [showtime_id]);

  const seatPrices = {
    A: movieInfo.hall ? movieInfo.hall.price : 0,
    B: movieInfo.hall ? movieInfo.hall.price : 0,
    C: movieInfo.hall ? movieInfo.hall.price : 0,
    D: movieInfo.hall ? movieInfo.hall.price : 0,
    E: movieInfo.hall ? movieInfo.hall.price : 0,
  };

  const showSeats = section => {
    console.log('Showing seats for section:', section);
    setSelectedSection(section);
    setModalVisible(true);
  };

  const toggleSeatSelection = seatId => {
    console.log('Toggling seat selection:', seatId);
    setSelectedSeats(prevSelectedSeats => {
      const index = prevSelectedSeats.indexOf(seatId);
      const newSelectedSeats = index > -1
        ? prevSelectedSeats.filter(seat => seat !== seatId)
        : [...prevSelectedSeats, seatId];
      console.log('Updated selected seats:', newSelectedSeats);
      return newSelectedSeats;
    });
  };

  const confirmSeats = () => {
    console.log('Confirming seats:', selectedSeats);
    if (selectedSeats.length > 0) {
      sessionStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
      alert(`確認座位: ${selectedSeats.join('、')}`);
      setModalVisible(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleModalClick = event => {
    if (event.target === event.currentTarget) {
      setModalVisible(false);
    }
  };

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
        const isReserved = reservedSeats.includes(seatId.trim());

        seatRow.push(
          <div
            key={seatId}
            className={`${styles['area-seat']} ${selectedSeats.includes(seatId) ? styles['area-selected'] : ''}`}
            style={isReserved ? { backgroundColor: '#ccc', cursor: 'not-allowed' } : {}}
            onClick={!isReserved ? () => toggleSeatSelection(seatId) : null}
          >
            {seatId}
          </div>
        );
      }
      seatElements.push(<div key={row} className={styles['area-seat-row']}>{seatRow}</div>);
    }

    return seatElements;
  };

  return (
    <div className={styles['area-body']}>
      <div className={styles['area-info']}>
        {movieInfo?.movie && movieInfo?.hall ? (
          <div className={styles['area-movie-info']}>
            <img className={styles['area-img']} src={movieInfo.movie.img} alt={movieInfo.movie.title} width={200} />
            <p className={styles['area-title']}>片名：{movieInfo.movie.title}</p>
            <p className={styles['area-date']}>{movieInfo.showDate?.show_date}</p>
            <p className={styles['area-hall-type']}>{movieInfo.hall.hall_type}</p>
            <p className={styles['area-hall-number']}>{movieInfo.hall.hall_number} 廳</p>
            <p className={styles['area-price']}>售價：{movieInfo.hall.price}</p>
          </div>
        ) : (
          <p>載入中...</p>
        )}
      </div>
      <h1 className={styles['area-header']}>請選擇座位</h1>
      <div className={styles['area-seating-chart']}>
        <div className={styles['area-stage']}>電影布幕</div>
        <div className={`${styles['area-section']} ${styles['area-section-a']}`} onClick={() => showSeats('A')}>A區</div>
        <div className={`${styles['area-section']} ${styles['area-section-b']}`} onClick={() => showSeats('B')}>B區</div>
        <div className={`${styles['area-section']} ${styles['area-section-c']}`} onClick={() => showSeats('C')}>C區</div>
        <div className={styles['area-seat-info']}>
          <h3>剩餘座位</h3>
          <ul>
            <li>A區 - 剩餘 {remainingSeats.A} 席</li>
            <li>B區 - 剩餘 {remainingSeats.B} 席</li>
            <li>C區 - 剩餘 {remainingSeats.C} 席</li>
            <li>D區 - 剩餘 {remainingSeats.D} 席</li>
            <li>E區 - 剩餘 {remainingSeats.E} 席</li>
          </ul>
        </div>
        <div className={`${styles['area-section']} ${styles['area-section-d']}`} onClick={() => showSeats('D')}>D區</div>
        <div className={`${styles['area-section']} ${styles['area-section-e']}`} onClick={() => showSeats('E')}>E區</div>

        {modalVisible && (
          <div className={styles['area-modal']} onClick={handleModalClick}>
            <div className={styles['area-modal-content']}>
              <span className={styles['area-close']} onClick={closeModal}>×</span>
              <h2>{selectedSection}區座位</h2>
              <div className={styles['area-seats']}>{renderSeats()}</div>
              <div id="selectedSeatsDisplay" className={styles['area-selected-seats']}>
                {selectedSeats.length > 0
                  ? `您選擇的座位為: ${selectedSeats.join(' 、 ')}`
                  : '您尚未選擇任何座位'}
              </div>
              <button className={styles['area-confirm-button']} onClick={confirmSeats}>確認</button>
            </div>
          </div>
        )}
      </div>
      <QuantityBtn showtimeInfo={movieInfo} selectedSeats={selectedSeats} />
    </div>
  );
};

export default Area;
