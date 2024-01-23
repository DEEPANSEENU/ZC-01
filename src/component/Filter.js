import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import '../styles/filter.css';

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      selectedLocation: '',
      selectedCuisines: [],
      selectedCost: '',
      icost: undefined,
      hcost: undefined,
      sortOption: '',
      currentPage: 1,
      itemsPerPage: 2,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios.get('http://localhost:9090/getAllRestaurants')
      .then(response => {
        this.setState({ restaurants: response.data });
      })
      .catch(err => console.log(err));
  }

  applyFilters() {
    let filteredRestaurants = [...this.state.restaurants];

    if (this.state.selectedLocation) {
      filteredRestaurants = filteredRestaurants.filter(item =>
        item.city.toLowerCase() === this.state.selectedLocation.toLowerCase()
      );
    }

    if (this.state.selectedCuisines.length > 0) {
      filteredRestaurants = filteredRestaurants.filter(item =>
        this.state.selectedCuisines.every(cuisine =>
          item.cuisine.some(c => c.name === cuisine)
        )
      );
    }

    if (this.state.icost !== undefined && this.state.hcost !== undefined) {
      filteredRestaurants = filteredRestaurants.filter(item =>
        item.min_price >= this.state.icost && item.min_price <= this.state.hcost
      );
    }

    if (this.state.sortOption === 'priceLowToHigh') {
      filteredRestaurants.sort((a, b) => a.min_price - b.min_price);
    } else if (this.state.sortOption === 'priceHighToLow') {
      filteredRestaurants.sort((a, b) => b.min_price - a.min_price);
    }

    return filteredRestaurants;
  }

  handleLocationChange = (event) => {
    this.setState({ selectedLocation: event.target.value, currentPage: 1 }, () => {
      this.filterRestaurants();
    });
  };

  handleCuisineChange = (event) => {
    const cuisine = event.target.value;
    this.setState(prevState => ({
      selectedCuisines: prevState.selectedCuisines.includes(cuisine)
        ? prevState.selectedCuisines.filter(item => item !== cuisine)
        : [...prevState.selectedCuisines, cuisine],
    }), () => {
      this.filterRestaurants();
    });
  };

  handleCostChange = (event) => {
    const selectedCost = event.target.value;
    let icost, hcost;

    switch (selectedCost) {
      case '<500':
        icost = 0;
        hcost = 500;
        break;
      case '500-1000':
        icost = 500;
        hcost = 1000;
        break;
      case '1000-1500':
        icost = 1000;
        hcost = 1500;
        break;
      default:
        icost = undefined;
        hcost = undefined;
    }

    this.setState({ selectedCost: selectedCost, icost: icost, hcost: hcost }, () => {
      this.filterRestaurants();
    });
  };

  handleSortChange = (event) => {
    this.setState({ sortOption: event.target.value }, () => {
      this.filterRestaurants();
    });
  };
  
  getAllCuisines = () => {
    const cuisines = new Set();
    this.state.restaurants.forEach(restaurant => {
      restaurant.cuisine.forEach(c => {
        cuisines.add(c.name);
      });
    });
    return Array.from(cuisines).map(name => ({ name })); // Convert set to array and map to objects
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page }, () => {
      this.filterRestaurants();
    });
  };

  filterRestaurants = () => {
    const { selectedLocation, selectedCuisines, icost, hcost, sortOption } = this.state;
    const req = {
      location: selectedLocation,
      cuisines: selectedCuisines,
      icost: icost,
      hcost: hcost,
      sort: sortOption
    };

    axios.post('http://localhost:9090/filterRestaurants', req)
      .then(response => {
        this.setState({ restaurants: response.data });
      })
      .catch(err => console.log(err));
  };

  render() {
    const filteredRestaurants = this.applyFilters();
    const { currentPage, itemsPerPage } = this.state;
    const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredRestaurants.slice(startIndex, endIndex);

    return (
      <div className="container">
        <div className="row heading">Breakfast places in Mumbai</div>
        <div className="row">
          <div className="col-12 col-md-4 col-lg-3">
            <div className="filterPanel">
              <div className="filterPanelHeading">Filters</div>
              <div className="filterPanelSubHeading">Select Location</div>
              <select
                className="locationSelection"
                onChange={this.handleLocationChange}
              >
                <option defaultValue>Select Location</option>
                <option>Delhi</option>
                {/* Add more locations as needed */}
                <option>New City</option>
              </select>
              <div className="filterPanelSubHeading">Cuisine</div>
              {this.getAllCuisines().map(cuisine => (
                <label key={cuisine.name}>
                  <input
                    type="checkbox"
                    className="cuisineOption"
                    value={cuisine.name}
                    onChange={this.handleCuisineChange}
                    checked={this.state.selectedCuisines.includes(cuisine.name)}
                  />
                  {cuisine.name}
                </label>
              ))}
              <div className="filterPanelSubHeading">Cost for two</div>
              <label>
                <input
                  type="radio"
                  className="costOption"
                  name="cost"
                  value="<500"
                  onChange={this.handleCostChange}
                  checked={this.state.selectedCost === '<500'}
                />
                Less than ₹500
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  className="costOption"
                  name="cost"
                  value="500-1000"
                  onChange={this.handleCostChange}
                  checked={this.state.selectedCost === '500-1000'}
                />
                ₹500 to ₹1000
              </label>
              <br/>
              <label>
                <input
                  type="radio"
                  className="costOption"
                  name="cost"
                  value="1000-1500"
                  onChange={this.handleCostChange}
                  checked={this.state.selectedCost === '1000-1500'}
                />
                ₹1000 to ₹1500
              </label>
              {/* Add more cost radio buttons as needed */}
              <div className="filterPanelSubHeading">Sort</div>
              <label>
                <input
                  type="radio"
                  className="sortOption"
                  name="price"
                  value="priceLowToHigh"
                  onChange={this.handleSortChange}
                  checked={this.state.sortOption === 'priceLowToHigh'}
                />
                Price low to high
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  className="sortOption"
                  name="price"
                  value="priceHighToLow"
                  onChange={this.handleSortChange}
                  checked={this.state.sortOption === 'priceHighToLow'}
                />
                Price high to low
              </label>
            </div>
          </div>
          <div className="col-12 col-md-8 col-lg-9">
            {currentItems.length > 0 ? (
              currentItems.map((restaurant, index) => (
                <Link key={index} to={`/details/${encodeURIComponent(restaurant.name)}`}>
                  <div className="row upperSection">
                    <div className="col-4 col-md-2">
                      <img
                        src={restaurant.thumb[0]}
                        className="resultsImage"
                        alt="Result"
                      />
                    </div>
                    <div className="col-8 col-md-10">
                      <div className="resultsHeading">{restaurant.name}</div>
                      <div className="resultsSubHeading">{restaurant.locality}</div>
                      <div className="resultsAddress">{restaurant.address}</div>
                    </div>
                  </div>
                  <br />
                  <div className="row lowerSection">
                    <div className="col-8">
                      <div className="resultsAddress">Cuisine:</div>
                      <div className="resultsSubHeading">
                        {restaurant.cuisine.map((c, i) => (
                          <span key={i}>{c.name}{i !== restaurant.cuisine.length - 1 && ', '}</span>
                        ))}
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="resultsAddress">Cost for two:</div>
                      <div className="resultsSubHeading">{restaurant.min_price}</div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className={`noResults ${filteredRestaurants.length === 0 ? 'highlighted' : ''}`}>
                No Results Found
              </div>
            )}
            <div className="pagination">
              <div
                className={`paginationButton ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => this.handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </div>
              {[...Array(totalPages)].map((_, index) => (
                <div
                  key={index}
                  className={`paginationButton ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => this.handlePageChange(index + 1)}
                >
                  {index + 1}
                </div>
              ))}
              <div
                className={`paginationButton ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => this.handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &gt;
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
