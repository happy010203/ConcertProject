import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../styles/OrderManagement.module.css';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;

    useEffect(() => {
        axios.get('http://localhost:8443/tickets')  // 更新為後端新的 API 端點
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }, []);

    const filteredOrders = orders.filter(order =>
        order.order_id.toString().includes(searchTerm) ||
        order.ticket_id.toString().includes(searchTerm) ||
        order.seat_id.toString().includes(searchTerm) ||
        order.showtime_id.toString().includes(searchTerm)
    );

    const startIndex = (currentPage - 1) * ordersPerPage;
    const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
        <div className={styles.headerST}>
            <ul>
                <li><Link to="/schedule">檔期管理</Link></li>
                <li><Link to="/news">新聞管理</Link></li>
                <li><Link to="/user_management">用戶管理</Link></li>
                <li><Link to="/order">查詢訂單</Link></li>
            </ul>
            </div>
            <div className={styles.container}>
                <h1>查詢訂單</h1>
                <input
                    type="text"
                    placeholder="搜尋訂單編號、票券編號、座位編號或放映時間編號"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchBox}
                />
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>訂單編號</th>
                            <th>票券編號</th>
                            <th>價格</th>
                            <th>購買時間</th>
                            <th>座位編號</th>
                            <th>放映時間編號</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedOrders.map(order => (
                            <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td>{order.price}</td>
                                <td>{order.purchase_time}</td>
                                <td>{order.seat_id}</td>
                                <td>{order.showtime_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={styles.pagination}>
                    {[...Array(Math.ceil(filteredOrders.length / ordersPerPage)).keys()].map(pageNumber => (
                        <button
                            key={pageNumber + 1}
                            onClick={() => handlePageChange(pageNumber + 1)}
                            className={currentPage === pageNumber + 1 ? styles.activePage : ''}
                        >
                            {pageNumber + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderManagement;
