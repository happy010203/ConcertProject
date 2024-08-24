import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <div className="location-date">
          <div className="date-button"><Link to="/Monday">Monday</Link></div>
          <div className="date-button"><Link to="/Tuesday">Tuesday</Link></div>
          <div className="date-button"><Link to="/Wensday">Wensday</Link></div>
          <div className="date-button"><Link to="/Thurday">Thurday</Link></div>
          <div className="date-button"><Link to="/Friday">Friday</Link></div>
          <div className="date-button"><Link to="/Saturday">Saturday</Link></div>
          <div className="date-button"><Link to="/Sunday">Sunday</Link></div>
      </div>
    </nav>
  );
};

export default Navigation;




