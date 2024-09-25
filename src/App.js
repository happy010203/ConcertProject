import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import HomePage from './pages/HomePage';
import HomePageIn from './pages/HomePageIn';
import AboutPage from './pages/AboutPage';
import AboutPageIn from './pages/AboutPageIn';
import OrderListPage from './pages/OrderListPage';
import OrderListPageIn from './pages/OrderListPageIn';
import UserListPage from './pages/UserListPage';
import UserListPageIn from './pages/UserListPageIn';
import SignupPage from './pages/SignupPage';
import LoginFormPage from './pages/LoginFormPage';
import ScheduleManagementPage from './pages/ScheduleManagementPage';
import UserManagementPage from './pages/UserManagementPage';
import OrderManagementPage from './pages/OrderManagementPage';
import NewsManagementPage from './pages/NewsManagementPage';
import MovieDetailPage from './pages/MovieDetailPage';
import MovieDetailPageIn from './pages/MovieDetailPageIn';
import MovieListPage from './pages/MovieListPage';
import MovieListPageIn from './pages/MovieListPageIn';
import CheckOutPage from './pages/CheckOutPage';
import CheckOutPageIn from './pages/CheckOutPageIn';
import Area from './components/Area';
import PrivateRoute from './components/PrivateRoute';
import EcpayPage from './pages/EcpayPage';
import PaymentResultPage from './pages/PaymentResultPage';
import { CartContext } from './CartContext';

const clientId = '210567720043-255mub33p83168jpgsoh5icunnppn1nu.apps.googleusercontent.com';

function App() {
    const [cartItems, setCartItems] = useState([]);

    return (
        <GoogleOAuthProvider clientId={clientId}>
            
                <Router>
                <CartContext.Provider value={{ cartItems, setCartItems }}>
                    <Routes>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/HomePageIn" element={<PrivateRoute element={<HomePageIn />} />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/AboutPageIn" element={<PrivateRoute element={<AboutPageIn />} />} />
                        <Route path="/OrderList" element={<OrderListPage />} />
                        <Route path="/OrderListIn" element={<PrivateRoute element={<OrderListPageIn />} />} />
                        <Route path="/UserList" element={<UserListPage />} />
                        <Route path="/UserListIn" element={<PrivateRoute element={<UserListPageIn />} />} />
                        <Route path="/login" element={<LoginFormPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/schedule" element={<ScheduleManagementPage />} />
                        <Route path="/user_management" element={<UserManagementPage />} />
                        <Route path="/order" element={<OrderManagementPage />} />
                        <Route path="/news" element={<NewsManagementPage />} />
                        <Route path="/MovieList" element={<MovieListPage />} />
                        <Route path="/MovieListIn" element={<PrivateRoute element={<MovieListPageIn />} />} />
                        <Route path="/MovieDetail/:id" element={<MovieDetailPage />} />
                        <Route path="/MovieDetailIn/:id" element={<PrivateRoute element={<MovieDetailPageIn />} />} />
                        <Route path="/CheckOut" element={<CheckOutPage />} />
                        <Route path="/CheckOutIn" element={<PrivateRoute element={<CheckOutPageIn />} />} />
                        <Route path="/area/:showtime_id" element={<Area />} />
                        <Route path="/EcpayPage" element={<PrivateRoute element={<EcpayPage />} />} />
                        <Route path="/PaymentResultPage" element={<PrivateRoute element={<PaymentResultPage />} />} />
                        <Route path="*" element={<h1>找不到頁面</h1>} />
                    </Routes>
                    </CartContext.Provider>
                </Router>
        </GoogleOAuthProvider>
    );
}

export default App;
