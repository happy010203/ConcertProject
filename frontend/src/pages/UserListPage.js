import React from 'react';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import UserList from '../components/UserList'; 

const UserListPage = () => {

    return (
        <div>
            <Header />
            <UserList />
            <Footer />
        </div>
    )
}

export default UserListPage;