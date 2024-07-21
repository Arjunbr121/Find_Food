import React from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleViewMenu = () => {
    navigate("/#explore-menu");
  };

  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favorite food here</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
          voluptatem temporibus aliquid sapiente incidunt facere, natus
          consequatur placeat eveniet suscipit sequi modi commodi quis obcaecati
          mollitia dolore totam autem reprehenderit.
        </p>
        <button onClick={handleViewMenu}>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
