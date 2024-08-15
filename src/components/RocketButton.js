import React, { useState } from "react";
import "@styles/RocketButton.css";
import { useNavigate } from "react-router-dom";

const RocketButton = () => {
  const [launch, setLaunch] = useState(false);
  const navigate = useNavigate();

  const handleLaunch = () => {
    setLaunch(true);
    setTimeout(() => {
      setLaunch(false);
      navigate("/AboutMe");
    }, 2000); // Reset after launch
  };

  return (
    <div className="rocket-container">
      <div
        className={`rocket ${launch ? "rocket-launch" : ""}`}
        onClick={handleLaunch}
      >
        <div className="rocket-body"></div>
        <div className="rocket-tip"></div>
        <div className="rocket-fin left-fin"></div>
        <div className="rocket-fin right-fin"></div>
        <div className="fire">
          <div className="flame"></div>
          <div className="flame"></div>
          <div className="flame"></div>
        </div>
      </div>
    </div>
  );
};

export default RocketButton;
