import React from "react";
import "./exploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";

const ExploreMenu = ({ category, setCatagory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam ipsam
        totam optio, rerum, assumenda fugiat repellendus, necessitatibus
        repudiandae labore aspernatur dignissimos tenetur delectus laudantium
        fuga corporis omnis vitae dolore minima.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCatagory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              className="explore-menu-list-item"
              key={index}
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt="menu image"
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
