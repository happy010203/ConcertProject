import React from 'react';
import HeaderIn from '../components/HeaderIn'; 
import FooterIn from '../components/FooterIn'; 
import NewsManagement from '../components/NewsManagement'; 

const NewsManagementPage = () => {

    return (
        <div>
            <HeaderIn />
            <NewsManagement />
            <FooterIn />
        </div>
    )
}

export default NewsManagementPage;