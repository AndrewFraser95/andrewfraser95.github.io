import React from "react";
import "@styles/SubmarineButton.css";

const SubmitFormButton = ({ buttonText, onSubmit }) => {
  const handleClick = (e) => {
    e.preventDefault(); // Prevent the default behavior
    if (onSubmit) {
      onSubmit(e); // Call the provided onSubmit function with the event
    }
  };

  return (
    <button onClick={handleClick} className="previous-button" type="button">
      {buttonText}
    </button>
  );
};

export default SubmitFormButton;
