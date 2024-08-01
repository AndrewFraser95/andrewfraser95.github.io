import React from "react";
import "../styles/ShipButton.css";

const SubmitFormButton = ({ buttonText, onSubmit }) => {
  const handleClick = (e) => {
    e.preventDefault(); // Prevent the default behavior
    if (onSubmit) {
      onSubmit(e); // Call the provided onSubmit function with the event
    }
  };

  return (
    <button className="space-button" onClick={handleClick} type="button">
      {buttonText}
    </button>
  );
};

export default SubmitFormButton;
