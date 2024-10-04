import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/UserManagement.module.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [role, setRole] = useState(() => {
        const storedRoles = JSON.parse(localStorage.getItem('roles'));
        return (storedRoles && storedRoles.includes('ROLE_MANAGER')) ? 'ROLE_MANAGER' : 'USER';
    });
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const navigate = useNavigate(); // 使用 useNavigate 進行頁面跳轉

    // 獲取用戶資料
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8443/movie/api/admin/getusers', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    // 切換用戶角色
    const toggleRole = async (id, newRole) => {
        console.log('Current role:', role);
        if (role === 'ROLE_MANAGER') {
            try {
                await axios.put(`http://localhost:8443/movie/api/manager/${id}/role`, null, {
                    params: { role: newRole }, // 使用 query parameter 傳遞角色
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setUsers(users.map(user =>
                    user.user_id === id ? { ...user, role: newRole } : user
                ));
            } catch (error) {
                console.error('Error updating role:', error);
            }
        } else {
            console.error('Unauthorized attempt to change role');
        }
    };

    // 過濾搜尋條件
    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 分頁邏輯
    const startIndex = (currentPage - 1) * usersPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 登入後處理
    const handleLoginResponse = (response) => {
        const token = response.token; // 從後端返回的數據中提取 token
        const roles = response.roles; // 從後端返回的數據中提取 roles

        // 存儲 JWT 到 localStorage
        localStorage.setItem('token', token);

        // 存儲角色信息到 localStorage
        localStorage.setItem('roles', JSON.stringify(roles));
        console.log(roles);
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
                <h1>用戶管理</h1>
                <input
                    type="text"
                    placeholder="搜尋用戶名或郵箱"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchBox}
                />
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>用戶名</th>
                            <th>郵箱</th>
                            <th>生日</th>
                            <th>性別</th>
                            <th>創建時間</th>
                            <th>角色</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.map(user => (
                            <tr key={user.user_id}>
                                <td>{user.user_id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.birthDate}</td>
                                <td>{user.gender}</td>
                                <td>{user.createdTime}</td>
                                <td>
                                    {role === 'ROLE_MANAGER' ? (
                                        <select
                                            value={user.role}
                                            onChange={(e) => toggleRole(user.user_id, e.target.value)}
                                            className={styles.roleDropdown}
                                        >
                                            <option value="USER">USER</option>
                                            <option value="ADMIN">ADMIN</option>
                                            <option value="MANAGER">MANAGER</option>
                                        </select>
                                    ) : (
                                        <span>{user.role}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={styles.pagination}>
                    {[...Array(Math.ceil(filteredUsers.length / usersPerPage)).keys()].map(pageNumber => (
                        <button
                            key={pageNumber + 1}
                            onClick={() => handlePageChange(pageNumber + 1)}
                            className={`${styles.pageButton} ${currentPage === pageNumber + 1 ? styles.activePage : ''}`}
                        >
                            {pageNumber + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserManagement;

