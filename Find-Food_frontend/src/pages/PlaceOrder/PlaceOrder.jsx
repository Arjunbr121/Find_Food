import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./placeOrder.css";
import axios, { all } from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItem, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const placeOrder = async (event) => {
    event.preventDefault();

    const orderItems = [];

    food_list.map((item) => {
      if (cartItem[item._id] && cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("error");
    }
  };
  useEffect(() => {
    if (!token) {
      navigate("/cart");
      toast.success("Please Login to Check your Cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
      toast.success("Your Cart is empty");
    }
  }, [token]);

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          required
        />
        <input
          type="text"
          placeholder="Street"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            placeholder="City"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            required
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="Zip Code "
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            required
          />
          <input
            type="text"
            placeholder="country"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            required
          />
        </div>
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Deliovery Fee</p>
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
          <button
            // onClick={() => navigate("/order")}
            type="submit"
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
