import React from "react";
import { SpaceContainer } from "@components/StyledComponents";
import RocketButton from "@components/RocketButton";
import SubmarineButton from "@components/SubmarineButton";
import AnimatedComponents from "@components/AnimatedComponents";
import "@styles/Home.css";

const Home = () => {
  return (
    <SpaceContainer>
      <h1 className="fade-in">Andrew Fraser</h1>
      <RocketButton buttonText="About Me" />
      <SubmarineButton buttonText="Contact Me" />
      <AnimatedComponents />
    </SpaceContainer>
  );
};

export default Home;
