import React from 'react';
import HeaderIn from '../components/HeaderIn'; 
import FooterIn from '../components/FooterIn'; 
import UserManagement from '../components/UserManagement'; 

const UserManagementPage = () => {

    return (
        <div>
            <HeaderIn />
            <UserManagement />
            <FooterIn />
        </div>
    )
}

export default UserManagementPage;