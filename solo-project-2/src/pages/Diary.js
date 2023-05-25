import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


export function Diary() {
  const location = useLocation();
  const { username } = location.state;

  const [mealData, setMealData] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState('');
  const [foodItem, setFoodItem] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000//api/meal/${username}`);
        if (response.ok) {
          const data = await response.json();
          setMealData(data);
        } else {
          console.log('Error in fetching meal data');
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, [username]);

  console.log('Meal Data:', mealData);

  const handleAddFood = async (e) => {
    e.preventDefault();
    if (selectedMeal && foodItem) {
      try {
        const response = await fetch(`http://localhost:5000/api/meal/${username}/${selectedMeal}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ foodItem }),
        });

        if (response.ok) {
          // Update the meal data in state
          const updatedMealData = { ...mealData };
          updatedMealData[selectedMeal].push(foodItem);
          setMealData(updatedMealData);

          // Clear the input fields
          setSelectedMeal('');
          setFoodItem('');
        } else {
          console.log('Error in adding food item');
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }
  };

  console.log('Meal Data:', mealData);

  return (
    <>
      <p>Diary</p>
      <form onSubmit={handleAddFood}>
        <select value={selectedMeal} onChange={(e) => setSelectedMeal(e.target.value)}>
          <option value="">Select Meal</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snacks">Snacks</option>
        </select>
        <input
          type="text"
          value={foodItem}
          onChange={(e) => setFoodItem(e.target.value)}
          placeholder="Food Item"
        />
        <button type="submit">Add Food</button>
      </form>
    </>
  );
}



