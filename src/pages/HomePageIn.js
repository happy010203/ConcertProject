import React, { useEffect, useState } from 'react';
import HeaderIn from '../components/HeaderIn';
import FooterIn from '../components/FooterIn';
import Home from '../components/Home';

const HomePageIn = () => {

    return (
        <div>
            <HeaderIn />
            <Home />
            <FooterIn />
        </div>
    );
}

export default HomePageIn;
