import React, { useEffect, useState } from 'react';
import styles from '../styles/UserList.module.css';
import axios from 'axios';

const UserList = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [editableField, setEditableField] = useState(null);
    const [updatedUser, setUpdatedUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.put(`http://localhost:8443/movie/api/movie/update/{id}`);
            setUser(response.data);
        };
        fetchUser();
    }, [userId]);

    const handleEdit = (field) => {
        setEditableField(field);
        setUpdatedUser({ ...user });
    };

    const handleChange = (field, value) => {
        setUpdatedUser({ ...updatedUser, [field]: value });
    };

    const handleUpdate = async () => {
        await axios.put(`/api/update/${userId}`, updatedUser);
        setUser(updatedUser);
        setEditableField(null);
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className={styles.UserList_container}>
            <h2 className={styles.UserList_h2}>會員中心</h2>
            <div className={styles.UserList_field}>
                <span>Username: {editableField === 'username' ?
                    <input
                        className={styles.UserList_input}
                        type="text"
                        value={updatedUser.username}
                        onChange={(e) => handleChange('username', e.target.value)}
                    /> : user.username}
                </span>
                <button className={styles.UserList_button} onClick={() => handleEdit('username')}>更改</button>
            </div>
            <div className={styles.UserList_field}>
                <span>Gender: {editableField === 'gender' ?
                    <select
                        className={styles.UserList_select}
                        value={updatedUser.gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
                    >
                        <option value="male">男</option>
                        <option value="female">女</option>
                    </select> : user.gender}
                </span>
                <button className={styles.UserList_button} onClick={() => handleEdit('gender')}>更改</button>
            </div>
            <div className={styles.UserList_field}>
                <span>Email: {editableField === 'email' ?
                    <input
                        className={styles.UserList_input}
                        type="email"
                        value={updatedUser.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                    /> : user.email}
                </span>
                <button className={styles.UserList_button} onClick={() => handleEdit('email')}>更改</button>
            </div>
            <div className={styles.UserList_field}>
                <span>Created Time: {user.createdTime}</span>
            </div>
            {editableField && <button className={styles.UserList_button} onClick={handleUpdate}>保存更改</button>}
        </div>
    );

};

export default UserList;
