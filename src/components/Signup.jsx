import React, { useState } from 'react';
import styles from '../styles/Signup.module.css'; // 使用命名空間導入你的CSS文件

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthDate: '',
        gender: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 檢查密碼和確認密碼是否一致
        if (formData.password !== formData.confirmPassword) {
            alert('密碼和確認密碼不一致');
            return;
        }

        fetch('http://localhost:8443/movie/api/movie/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                alert('完成註冊');
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    birthDate: '', 
                    gender: '',
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('註冊失敗');
        });
    };

    return (
        <div className={styles.body}> {/* 使用CSS模組命名空間 */}
            <div className={styles.formContainer}> {/* 使用CSS模組命名空間 */}
                <h2>建立帳號</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="使用者名稱" 
                        value={formData.username} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="密碼" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        placeholder="確認密碼" 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="date" 
                        name="birthDate" 
                        placeholder="出生年月日" 
                        value={formData.birthDate} 
                        onChange={handleChange} 
                        required 
                    />
                    <select 
                        name="gender" 
                        value={formData.gender} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="" disabled>生理性别</option>
                        <option value="Male">男</option>
                        <option value="Female">女</option>
                        <option value="Other">其他</option>
                    </select>
                    
                    <button type="submit">註冊</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;

