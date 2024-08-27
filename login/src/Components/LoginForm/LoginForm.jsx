import React from "react";
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
const LoginForm = () => {
    const responseGoogle = (response) => {
        console.log('Login Success:', response); 
        
    };

    const responseGoogleError = (error) => {
        console.error('Login Failed:', error); 
        
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        console.log('Username:', username);
        console.log('Password:', password);

        
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" id="username" required />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" id="password" required />
                    <FaLock className="icon" />
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox" onClick={() => setcookie()} /> Remember me</label>
                    <a href="#">Forgot Password</a>
                </div>
                <button type="submit">Login</button>
                
                <div className="register-link">
                    <p>Don't have an account? <Link to="/signup" style={{ color: 'blue' }}>Register</Link></p>
                </div>
                <div className="google-login">
                    <GoogleLogin
                        onSuccess={responseGoogle}
                        onError={responseGoogleError}
                    />
                </div>
            </form>
        </div>
    );
};


const setcookie = () => {
    const u = document.getElementById('username').value;
    const v = document.getElementById('password').value;

    document.cookie = `username=${u}; path=/`;
    document.cookie = `password=${v}; path=/`;
};

export default LoginForm;
