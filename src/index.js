import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//import Home from './component/Home';
import Routing from './component/Router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routing/>
  </React.StrictMode>
);


