import React, { useState } from "react";

import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import NavBar from "./componets/Navbar/NavBar";
import Home from "./pages/Home/Home";
import Footer from "./componets/Footer/Footer";
import LoginPopUp from "./componets/LoginPopUp/LoginPopUp";
import { Toaster } from "react-hot-toast";
import Verify from "./pages/Verify/Verify";
import MyOrder from "./pages/MyOrder/MyOrder";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <NavBar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/my-orders" element={<MyOrder />} />
        </Routes>
        <Toaster position="top-right" />
      </div>

      <Footer />
    </>
  );
};

export default App;
