// Routing.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Filter from './Filter';
import Details from './Details';
import Header from './Header';

const Routing = () => {
    return (
        <Router>
           <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filter" element={<Filter />} />
                <Route path="/details/:name" element={<Details />} />
                
            </Routes>
        </Router>
    );
}

export default Routing;
