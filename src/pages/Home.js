import React from "react";
import { SpaceContainer } from "../components/StyledComponents";
import SpaceButton from "../components/SpaceButton";
import ShipButton from "../components/ShipButton";
import AnimatedComponents from "../components/AnimatedComponents";
import "../styles/Home.css";

const Home = () => {
  return (
    <SpaceContainer>
      <h1 className="fade-in">Andrew Fraser</h1>
      <SpaceButton buttonText="About Me" />
      <ShipButton buttonText="Contact Me" />
      <AnimatedComponents />
    </SpaceContainer>
  );
};

export default Home;
