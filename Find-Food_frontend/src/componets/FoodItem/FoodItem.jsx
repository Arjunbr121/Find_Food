import React, { useContext, useState } from "react";
import "./foodItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, image, description }) => {
  const [count, setCount] = useState(0);
  const { cartItem, removeFromCart, addtoCart, url } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-container">
        <img
          src={url + "/images/" + image}
          alt="productimg"
          className="food-item-image"
        />
        {!cartItem[id] ? (
          <img
            src={assets.add_icon_white}
            onClick={() => addtoCart(id)}
            alt="productimg"
            className="add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              alt="remove-item"
              className="item-count"
              onClick={() => removeFromCart(id)}
            />
            <p>{cartItem[id]}</p>
            <img
              src={assets.add_icon_green}
              alt="add-item"
              className="add-item"
              onClick={() => addtoCart(id)}
            />
          </div>
        )}
      </div>
      <div className="item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img
            src={assets.rating_starts}
            alt="rating"
            className="rating-stars"
          />
        </div>
        <p className="food-item-description ">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
