import React, { useContext, useEffect, useState } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searcParams, setSearchParams] = useSearchParams();
  const success = searcParams.get("sucess");
  const orderId = searcParams.get("orderId");
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const resposne = await axios.post(url + "/api/order/verify", {
      success,
      orderId,
    });
    if (resposne.data.success) {
      navigate("/my-orders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  const { url } = useContext(StoreContext);
  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
8;
