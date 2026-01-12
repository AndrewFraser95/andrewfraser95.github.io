import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SpaceContainer } from "@components/StyledComponents";
import Potato3D from "@components/Potato3D";
import AnimatedComponents from "@components/AnimatedComponents";
import "@styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handlePotatoClick = () => {
    navigate("/AboutMe");
  };

  const handleContactClick = () => {
    navigate("/ContactMe");
  };

  const handleCaliBirClick = () => {
    navigate("/CaliBir");
  };

  return (
    <SpaceContainer>
      <div className="home-content">
        <motion.div
          className="potato-wrapper"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Potato3D onClick={handlePotatoClick} />
        </motion.div>

        <motion.p
          className="potato-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Click the potato to learn more
        </motion.p>

        <motion.button
          className="contact-button"
          onClick={handleContactClick}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 8px 30px rgba(0, 212, 255, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          Contact Me
        </motion.button>

        <motion.button
          className="contact-button"
          onClick={handleCaliBirClick}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 8px 30px rgba(0, 212, 255, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          CaliBir App
        </motion.button>
      </div>
      <AnimatedComponents />
    </SpaceContainer>
  );
};

export default Home;
