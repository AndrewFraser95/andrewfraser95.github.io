import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@styles/SubmarineButton.css";

const SubmarineButton = () => {
  const [launch, setLaunch] = useState(false);
  const navigate = useNavigate();

  const handleLaunch = () => {
    setLaunch(true);
    setTimeout(() => {
      setLaunch(false);
      navigate("/ContactMe"); // Change to your desired route
    }, 2000); // Reset after animation and navigate
  };

  return (
    <div className="submarine-container">
      <div
        className={`submarine ${launch ? "launch" : ""}`}
        onClick={handleLaunch}
      >
        <div className="submarine-body">
          <div className="submarine-window"></div>
          <div className="submarine-window"></div>
          <div className="submarine-window"></div>
        </div>
        <div className="submarine-propeller"></div>
        <div className="submarine-periscope"></div>
        {launch && (
          <div className="bubbles">
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmarineButton;
