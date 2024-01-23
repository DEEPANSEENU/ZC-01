import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Quicksearchitem = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (meal_type) => {
    if (location.pathname === '/filter') {
      // If on the filter page, navigate to the home page
      navigate('/');
    } else {
      // If on the home page, navigate to the filter page
      navigate(`/filter?mealtype=${meal_type}`);
    }
  };

  const { name, content, image, meal_type } = props.quicksearchitemdata;

  return (
    <div
      className="qs-box col-12 col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4"
      onClick={() => handleNavigate(meal_type)}
    >
      <div className="qs-box-contents">
        <img src={`../${image}`} alt="Not Found" className="qs-image" />
        <h4 className="qs-item-heading">{name}</h4>
        <p className="qs-item-description">{content}</p>
      </div>
    </div>
  );
};

export default Quicksearchitem;
