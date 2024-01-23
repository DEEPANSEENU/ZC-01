import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Wallpaper from './Wallpaper';
import Quicksearch from './Quicksearch';
import '../styles/home.css';

function Home() {
  const [locations, setLocations] = useState([]);
  const [mealtypes, setMealtypes] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:9090/getAllLocations',
      headers: { 'content-Type': 'application/json' }
    })
      .then(response => {
        setLocations(response.data);
      })
      .catch(err => console.log(err));

    axios({
      method: 'GET',
      url: 'http://localhost:9090/getAllMealTypes',
      headers: { 'content-Type': 'application/json' }
    })
      .then(response => {
        setMealtypes(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleMealTypeSelection = (selectedMealType) => {
    // Redirect to Filter page with the selected city and meal type
    navigate(`/filter?city=${encodeURIComponent(selectedCity)}&mealtype=${encodeURIComponent(selectedMealType)}`);
  }

  const handleLocationSelection = (selectedCity) => {
    // Update the selected city in the state
    setSelectedCity(selectedCity);
  }

  return (
    <div>
      <Wallpaper
        locationdata={locations}
        onLocationSelect={handleLocationSelection}
      />
      <Quicksearch
        quicksearchdata={mealtypes}
        onMealTypeSelect={handleMealTypeSelection}
      />
    </div>
  );
}

export default Home;
