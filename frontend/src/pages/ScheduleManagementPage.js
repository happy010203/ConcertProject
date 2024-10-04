import React from 'react';
import HeaderIn from '../components/HeaderIn'; 
import FooterIn from '../components/FooterIn'; 
import ScheduleManagement from '../components/ScheduleManagement'; 

const ScheduleManagementPage = () => {

    return (
        <div>
            <HeaderIn />
            <ScheduleManagement />
            <FooterIn />
        </div>
    )
}

export default ScheduleManagementPage;