import React, { useContext } from "react";
import "./foodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // Checking if food_list is an array and has items
  const isValidFoodList = Array.isArray(food_list) && food_list.length > 0;

  return (
    <div className="food-disply" id="food-display">
      <h2>Top Dishes near you</h2>
      <div className="food-display-list">
        {isValidFoodList ? (
          food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  image={item.image}
                />
              );
            }
            return null;
          })
        ) : (
          <p>No food items available</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
