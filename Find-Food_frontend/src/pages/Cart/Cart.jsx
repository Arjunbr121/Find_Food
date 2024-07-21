import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItem, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  // Check if cartItem and food_list are valid
  const isValidCartItem = cartItem && Object.keys(cartItem).length > 0;
  const isValidFoodList = Array.isArray(food_list) && food_list.length > 0;

  return (
    <div className="cart">
      {isValidCartItem && isValidFoodList ? (
        <>
          <div className="cart-item">
            <div className="cart-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />
            {food_list.map((item, index) => {
              if (cartItem[item._id] > 0) {
                return (
                  <div key={index}>
                    <div className="cart-items-title cart-item-item">
                      <img
                        src={url + "/images/" + item.image}
                        alt={item.name}
                      />
                      <p>{item.name}</p>
                      <p>${item.price}</p>
                      <p>{cartItem[item._id]}</p>
                      <p>${item.price * cartItem[item._id]}</p>
                      <p
                        className="cross"
                        onClick={() => removeFromCart(item._id)}
                      >
                        X
                      </p>
                    </div>
                    <hr />
                  </div>
                );
              }
              return null; // Return null for items not in the cart
            })}
          </div>
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Total</h2>
              <div>
                <div className="cart-total-details">
                  <p>SubTotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>
                    ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                  </b>
                </div>
              </div>
              <button onClick={() => navigate("/order")}>
                PROCEED TO CHECKOUT
              </button>
            </div>
            <div className="cart-promocode">
              <div>
                <p>If you have a promo code please enter it here</p>
                <div className="cart-promocode-input">
                  <input type="text" placeholder="promo code" />
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>No items in the cart</div>
      )}
    </div>
  );
};

export default Cart;
