import React from "react";
import { SpaceContainer } from "../components/StyledComponents";
import ContactMeForm from "../components/ContactMeForm";
import AnimatedComponents from "../components/AnimatedComponents";
import { useNavigate } from "react-router-dom";
import "../styles/Page.css";

const ContactMe = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Home");
  };

  return (
    <SpaceContainer>
      <h1>Contact Me</h1>
      <ContactMeForm />
      <button className="previous-button" onClick={handleClick}>
        Go to Home
      </button>
      <AnimatedComponents />
    </SpaceContainer>
  );
};

export default ContactMe;
