import React, { useState, useEffect } from 'react';
import '../styles/menucard.css';

const MenuCard = ({ restaurantName, closeMenu }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [availableMeals, setAvailableMeals] = useState([
    { name: 'Chicken Biryani', price: 160, amount: 0 },
    { name: 'Paneer Tikka', price: 100, amount: 0 },
    //{ name: 'Masala Dosa', price: 75, amount: 0 },
    { name: 'Butter Chicken', price: 120, amount: 0 },
    { name: 'Chilli parotta', price: 130, amount: 0 },
  ]);


  const handleAddButtonClick = (itemName, price, e) => {
    e.stopPropagation();
  
    // Calculate total price before adding the item
    const updatedItems = selectedItems.map((item) =>
      item.name === itemName ? { ...item, amount: item.amount + 1 } : item
    );
  
    setTotalPrice(totalPrice + price);
    setSelectedItems(updatedItems);
  
    // Update the quantity in the availableMeals array
    const updatedMeals = availableMeals.map((meal) =>
      meal.name === itemName ? { ...meal, amount: meal.amount + 1 } : meal
    );
  
    // Update the availableMeals array
    setAvailableMeals(updatedMeals);
  };

  const handlePayNowButtonClick = () => {
    // Show a pop-up message indicating that payment integration is in process
    alert('Payment integration is still in process. Please wait.');
  };
  
  useEffect(() => {
    // This effect ensures that the state is updated before proceeding with the payment
    console.log(selectedItems);
  }, [selectedItems]);

  return (
    <div className="menu-card-container">
      <button className="close-button" onClick={closeMenu}>
        Close
      </button>
      <h2 className='headingMenu'>{restaurantName} Menu</h2>
      <div className='boxShadow'>
        {availableMeals.map((food, index) => (
          <div className='foodList' key={index}>
            <span>{food.name}</span>
            <span>{food.amount}</span>
            <button onClick={(e) => handleAddButtonClick(food.name, food.price, e)}>Add</button>
          </div>
        ))}

        <h3 className='selectedItems'>Selected Items</h3>
        <ul>
          {selectedItems.map((item, index) => (
            <li key={index}>
              {item.name} - {item.amount} - ${item.price}
            </li>
          ))}
        </ul>
        <div>
          <strong className='total'>Total Price: ${totalPrice}</strong>
          <button className='pay-now-button' onClick={handlePayNowButtonClick}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
