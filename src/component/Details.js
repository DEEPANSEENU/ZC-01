import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/details.css';
import MenuCard from './MenuCard';

const Details = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { name } = useParams();

  const [restaurantDetails, setRestaurantDetails] = useState({
    contact_number: '',
    address: '',
    min_price: '',
    cuisine: [],
    image: '',
  });

  const [error, setError] = useState(null);

  const fetchRestaurantDetails = useCallback(() => {
    axios
      .get(`http://localhost:9090/getRestaurantDetails/${name}`)
      .then((response) => {
        console.log('API Response:', response.data);
        if (response.status === 200) {
          const restaurantData = response.data;
          console.log(restaurantData);
          if (restaurantData && Object.keys(restaurantData).length > 0) {
            setRestaurantDetails({
              name: restaurantData.name,
              contact_number: restaurantData.contact_number,
              address: restaurantData.locality,
              min_price: restaurantData.min_price,
              cuisine: restaurantData.cuisine,
              image: restaurantData.image,
            });
            setError(null);
          } else {
            console.error('Invalid API Response:', response.data);
            setError('Invalid API Response');
          }
        } else {
          console.error('Error fetching data. Status code:', response.status);
          setError('Error fetching data');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      });
  }, [name]);

  useEffect(() => {
    console.log('useEffect is called');
    fetchRestaurantDetails();
  }, [fetchRestaurantDetails]);

  const { contact_number, address, min_price, cuisine, image } = restaurantDetails;

  const openMenu = () => {
    setMenuOpen(true);
    document.body.classList.add('modal-open');
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove('modal-open');
  };


  return (
    <div>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          <div>
            <img src={`../${image}`} className="detailsImage" alt={name} />
            <button className="button">Click to see Image Gallery</button>
          </div>
          <div className="heading">{name}</div>
          <button className="btn-order" onClick={openMenu}>
            Place Online Order
          </button>
          <div className="tabs">
            <div className="tab">
              <input type="radio" id="tab-1" name="tab-group-1" defaultChecked />
              <label htmlFor="tab-1">Overview</label>
              <div className="content">
                <div className="about">About this place</div>
                {cuisine && (
                  <>
                    <div className="head">Cuisine</div>
                    <div className="value">{cuisine.map((c) => c.name).join(', ')}</div>
                  </>
                )}
                <div className="head">Average Cost</div>
                <div className="value">&#8377; {min_price} (approx)</div>
              </div>
            </div>
            <div className="tab">
              <input type="radio" id="tab-2" name="tab-group-1" />
              <label htmlFor="tab-2">Contact</label>
              <div className="content">
                <div className="head">Phone Number</div>
                <div className="value">{contact_number}</div>
                <div className="head">Address</div>
                <div className="value">{address}</div>
              </div>
          </div>
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="modal-overlay" onClick={closeMenu}>
          <div className="modal-container">
            <MenuCard restaurantName={name} closeMenu={closeMenu} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;