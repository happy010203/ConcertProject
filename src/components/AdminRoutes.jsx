import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const AdminRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = true; // 在這裡檢查管理員的登入狀態
    return (
        <Route
            {...rest}
            element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
        />
    );
};

export default AdminRoute;
