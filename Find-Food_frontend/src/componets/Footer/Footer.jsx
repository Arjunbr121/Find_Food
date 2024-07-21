import React from "react";
import "./footer.css";
import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus
            iusto eos velit molestiae, inventore tempora itaque totam, expedita
            vero accusantium sapiente in autem mollitia qui magnam. Porro nisi
            sed corporis!
          </p>
          <div className="footer-sopcial-icons">
            <img src={assets.facebook_icon} alt="" className="socialicon" />
            <img src={assets.twitter_icon} alt="" className="socialicon" />
            <img src={assets.linkedin_icon} alt="" className="socialicon" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMAPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privecy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 938033453</li>
            <li>conatct@findfood.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        &copy; 2024 Find-Food.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
