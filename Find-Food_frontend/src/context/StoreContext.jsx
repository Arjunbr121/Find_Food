import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

// import { food_list } from "../assets/frontend_assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});
  const [food_list, setFoodList] = useState({});
  const [token, setToken] = useState("");

  const url = "http://localhost:4000";

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    setFoodList(response?.data?.data);
  };

  const addtoCart = async (itemId) => {
    if (!cartItem[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      const response = await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    }
  };
  const removeFromCart = async (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      const response = await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    }
  };
  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItem(response.data.cartData);
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    if (!Array.isArray(food_list)) {
      console.error("food_list is not an array or is not defined");
      return totalAmount;
    }

    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItem[item];
        } else {
          console.warn(`Item with _id ${item} not found in food_list`);
        }
      }
    }

    return totalAmount;
  };

  useEffect(() => {
    async function loadData() {
      fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItem,
    setCartItem,
    removeFromCart,
    addtoCart,
    getTotalCartAmount,
    url,
    setToken,
    token,
    loadCartData,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
