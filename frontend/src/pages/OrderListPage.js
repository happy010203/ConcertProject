import React from 'react';
import HeaderIn from '../components/HeaderIn'; 
import FooterIn from '../components/FooterIn'; 
import OrderList from '../components/OrderList'; 

const OrderListPage = () => {

    return (
        <div>
            <HeaderIn />
            <OrderList />
            <FooterIn />
        </div>
    )
}

export default OrderListPage;
