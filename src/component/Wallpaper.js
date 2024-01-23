import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// ... (existing imports)

function Wallpaper(props) {
  const [restaurants, setRestaurants] = useState([]);
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Fetch all restaurants when the component mounts
    axios({
      method: 'GET',
      url: 'http://localhost:9090/getAllRestaurants',
      headers: { 'content-Type': 'application/json' }
    })
      .then(response => {
        setRestaurants(response.data);
      })
      .catch(err => console.log(err));
  }, []); 

  const handleLocation = (event) => {
    const location_id = event.target.value;

    console.log("Selected location_id:", location_id);

    // Filter restaurants based on the selected location
    const filteredRestaurants = restaurants.filter(item =>
      item.location_id.toString() === location_id
    );

    setRestaurants(filteredRestaurants);
  }

  const handleSearch = (event) => {
    const inputText = event.target.value;

    console.log("All Restaurants:", restaurants);

    if (inputText.trim() === '') {
      setSuggestions([]);
      setInputText(inputText);
      return;
    }

    const filteredSuggestions = restaurants.filter(item =>
      item.name.toLowerCase().includes(inputText.toLowerCase()) ||
      item.locality.toLowerCase().includes(inputText.toLowerCase())
    );

    console.log("Filtered Suggestions:", filteredSuggestions);

    setSuggestions(filteredSuggestions);
    setInputText(inputText);
  }

  const showSuggestion = () => {
    console.log("Current Suggestions:", suggestions);

    if (suggestions.length === 0 && inputText.trim() === '') {
      return null;
    }

    if (suggestions.length === 0 && inputText.trim() !== '') {
      return (
        <ul>
          <li>No Search Results Found</li>
        </ul>
      );
    }

    return (
      <ul>
        {suggestions.map((item, index) => (
          <li key={index}>
          <Link to={`/details/${encodeURIComponent(item.name)}`}>
              {`${item.name} - ${item.locality}, ${item.city} - Rating: ${item.aggregate_rating}`}
          </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <img src="./Assets/wallpaper.png" alt="Not Found" className="homeImage" />
      <div className="topSection container">
        <div className="logo">e!</div>
        <div className="headerText">Find the best restaurants, cafes, and bars</div>
        <div className="searchOptions">
          <span>
            <select className="locationBox" onChange={handleLocation}>
              <option value='0'>-Select City-</option>
              {props.locationdata && props.locationdata.map((item) => (
                <option key={item.location_id} value={item.location_id}>
                  {`${item.name}, ${item.city}`}
                </option>
              ))}
            </select>
          </span>
          <span className="searchBox">
            <i className="bi bi-search"></i>
            <div id="notebooks">
              <input id='query' type="text" className="searchInput" placeholder="Search for restaurants" onChange={handleSearch} />
              {showSuggestion()}
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Wallpaper;

