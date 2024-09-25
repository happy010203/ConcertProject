import React from 'react';
import HeaderIn from '../components/HeaderIn'; 
import FooterIn from '../components/FooterIn'; 
import OrderManagement from '../components/OrderManagement'; 

const OrderManagementPage = () => {

    return (
        <div>
            <HeaderIn />
            <OrderManagement />
            <FooterIn />
        </div>
    )
}

export default OrderManagementPage;
