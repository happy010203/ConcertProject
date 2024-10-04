import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem('token'); // 假設 token 用來檢查登入狀態

    return token ? element : <Navigate to="/" />;
};

export default PrivateRoute;