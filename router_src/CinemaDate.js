import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Monday from './DateComponents/Monday';
import Tuesday from './DateComponents/Tuesday';
import Wensday from './DateComponents/Wensday';
import Thurday from './DateComponents/Thurday';
import Friday from './DateComponents/Friday';
import Saturday from './DateComponents/Saturday';
import Sunday from './DateComponents/Sunday';

import Navigation from './DateComponents/Navigation';

const CinemaDate = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/Monday" element={<Monday />} />
          <Route path="/Tuesday" element={<Tuesday />} />
          <Route path="/Wensday" element={<Wensday />} />
          <Route path="/Thurday" element={<Thurday />} />
          <Route path="/Friday" element={<Friday />} />
          <Route path="/Saturday" element={<Saturday />} />
          <Route path="/Sunday" element={<Sunday />} />
        </Routes>
      </div>
    </Router>
  );
};

export default CinemaDate;