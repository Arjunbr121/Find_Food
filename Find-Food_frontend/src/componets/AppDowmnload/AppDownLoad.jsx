import React from "react";
import "./appDownLoad.css";
import { assets } from "../../assets/frontend_assets/assets";

const AppDownLoad = () => {
  return (
    <div className="app-dowmnload" id="app-dowmnload">
      <p>
        For better experience Download
        <br />
        Find-Food App
      </p>
      <div className="app-dowmnload-platform">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  );
};

export default AppDownLoad;
