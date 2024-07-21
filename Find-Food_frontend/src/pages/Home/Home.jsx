import React, { useState } from "react";
import Header from "../../componets/Header/Header";
import ExploreMenu from "../../componets/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../componets/FoodDisplay/FoodDisplay";
import AppDownLoad from "../../componets/AppDowmnload/AppDownLoad";

const Home = () => {
  const [category, setCatagory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu setCatagory={setCatagory} category={category} />
      <FoodDisplay category={category} />
      <AppDownLoad />
    </div>
  );
};

export default Home;
