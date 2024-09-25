// import React from 'react';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import jwt_decode from 'jwt-decode';  // 用來解析 Google 回傳的 JWT token
// import { useNavigate } from 'react-router-dom';  // 引入 useNavigate 進行導航

// const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;  // 使用環境變數

// const GoogleLoginComponent = () => {
//     const navigate = useNavigate();  // 使用 useNavigate 進行導航

//     const handleLoginSuccess = async (credentialResponse) => {
//         console.log('Google Login Success:', credentialResponse);

//         // 檢查是否有獲取到 credential
//         if (credentialResponse && credentialResponse.credential) {
//             try {
//                 // 從 Google 回傳的 credentialResponse 取得 JWT token
//                 const { credential } = credentialResponse;

//                 // 使用 jwt_decode 來解析 JWT token，取得使用者資訊
//                 const decodedToken = jwt_decode(credential);
//                 console.log('Decoded Token:', decodedToken);

//                 const { name, email } = decodedToken;  // 從 token 中提取使用者資訊

//                 // 將 token 和使用者資訊傳送到後端進行驗證
//                 const res = await fetch('https://localhost:8443/movie/api/movie/google-login', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ token: credential }),  // 发送 Google 返回的凭证到后端
//                 });

//                 const data = await res.json();

//                 if (res.ok) {
//                     // 假设后端返回 JWT token 和用户信息，存储到 localStorage
//                     const { token, roles } = data;
//                     localStorage.setItem('token', token);  // 保存後端返回的 JWT token
//                     localStorage.setItem('roles', JSON.stringify(roles));  // 保存 roles
//                     localStorage.setItem('name', name);  // 保存使用者名稱
//                     localStorage.setItem('email', email);  // 保存使用者 Email

//                     console.log('Login Success: Token and roles stored');

//                     // 成功後跳轉到首頁
//                     navigate('/home');
//                 } else {
//                     console.error('後端登入失敗:', data.message);
//                     alert('Google login failed: ' + data.message);
//                 }
//             } catch (error) {
//                 console.error('Error during Google login:', error);
//                 alert('Error during Google login: ' + error.message);
//             }
//         } else {
//             console.error('No credential found in response');
//             alert('登入失敗，請重試。');
//         }
//     };

//     const handleLoginFailure = (error) => {
//         console.log('Google Login Failed:', error);
//         alert('Google 登入失敗，請重試。');
//     };

//     return (
//         <GoogleOAuthProvider clientId={clientId}>
//             <div className="App">
//                 <GoogleLogin
//                     onSuccess={handleLoginSuccess}
//                     onError={handleLoginFailure}
//                 />
//             </div>
//         </GoogleOAuthProvider>
//     );
// };

// export default GoogleLoginComponent;

