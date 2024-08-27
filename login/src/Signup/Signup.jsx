import React, { useState, useEffect } from 'react';
import './Signup.css'; // 导入你的CSS文件

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthDate: '', // 修改为 birthDate
        gender: '',
        location: ''
    });

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // 用于显示加载状态
    const [error, setError] = useState(null); // 用于显示错误信息

    // 获取用户数据
    useEffect(() => {
        fetch('http://localhost:8080/movie/signupapi/getusers') // 替换为你的后端 API URL
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setError('Failed to fetch users');
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 确保密码和确认密码一致
        if (formData.password !== formData.confirmPassword) {
            alert('密碼不一致');
            return;
        }

        // 检查用户名或电子邮件是否已存在
        const userExists = users.some(user => 
            user.username === formData.username || user.email === formData.email
        );

        if (userExists) {
            alert('用戶名或E-mail已被註冊');
            return;
        }

        // 重新格式化日期为 YYYY-MM-DD
        const formattedBirthDate = new Date(formData.birthDate).toISOString().split('T')[0];
        console.log('Formatted BirthDate:', formattedBirthDate);
        // 发送请求到后端
        fetch('http://localhost:8080/movie/signupapi/postusers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...formData,
                birthDate: formattedBirthDate // 使用格式化后的日期
            })
        })
        .then(response => response.text())  // 使用 .text() 而不是 .json()
        .then(data => {
            console.log('Success:', data);
            // 這裡可以重置表單或顯示成功消息
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                birthDate: '', 
                gender: '',
            });
            alert('完成註冊');
        })
        .catch(error => {
            console.error('Error:', error);
            setError('註冊失敗'); // 顯示錯誤信息
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="form-container"> {/* 使用CSS样式类 */}
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
    );
};

export default RegisterForm;
