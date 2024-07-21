import React, { useContext, useEffect, useState } from "react";
import "./loginpopup.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPopUp = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { url, token, setToken } = useContext(StoreContext);

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      toast.success("Login Successfully");
      setShowLogin(false);
    } else {
      toast.error(response.data.message);
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <div className="login-pop-up">
      <form className="login-pop-up-container" onSubmit={onLogin}>
        <div className="login-pop-up-title">
          <h2>{currentState}</h2>
          <img
            src={assets.cross_icon}
            alt="cross icon"
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="login-pop-up-input">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder="Your Name"
              required
              name="name"
              onChange={onChangeHandler}
              value={data.name}
            />
          )}
          <input
            type="email"
            placeholder="Your Email"
            required
            name="email"
            onChange={onChangeHandler}
            value={data.email}
          />
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            onChange={onChangeHandler}
            value={data.password}
          />
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-pop-up-condition">
          <input type="checkbox" required />
          <p>By continuing i agure to terms of use & privacy policy.</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new ccount ?{" "}
            <span
              onClick={() => {
                setCurrentState("Sign Up");
              }}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => {
                setCurrentState("Login");
              }}
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp;
