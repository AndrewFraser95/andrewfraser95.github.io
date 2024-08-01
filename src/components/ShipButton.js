import React, { useState } from "react";
import "../styles/ShipButton.css";
import { useNavigate } from "react-router-dom";

const ShipButton = ({ buttonText }) => {
  const [isLaunching, setIsLaunching] = useState(false);
  const navigate = useNavigate();

  const redirectToContactMe = () => {
    setIsLaunching(true);
    setTimeout(() => {
      setIsLaunching(false);
      navigate("/ContactMe");
    }, 2000); // Reset launch animation after 2 seconds
  };

  return (
    <button
      className={`ship-button ${isLaunching ? "active" : ""}`}
      onClick={redirectToContactMe}
    >
      {buttonText}
    </button>
  );
};

export default ShipButton;
