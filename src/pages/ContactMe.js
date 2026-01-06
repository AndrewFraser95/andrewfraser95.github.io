import React from "react";
import { motion } from "framer-motion";
import { SpaceContainer } from "@components/StyledComponents";
import ContactMeForm from "@components/ContactMeForm";
import { useNavigate } from "react-router-dom";
import "@styles/ContactMe.css";

const ContactMe = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <SpaceContainer>
      <motion.div
        className="contact-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="contact-header" variants={itemVariants}>
          <h1>Get In Touch</h1>
          <p className="contact-subtitle">
            Have a project in mind? Want to collaborate? Just want to say hello?
          </p>
        </motion.div>

        <motion.div className="contact-content" variants={itemVariants}>
          <ContactMeForm />
        </motion.div>

        <motion.button
          className="back-button"
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variants={itemVariants}
        >
          ← Back to Home
        </motion.button>
      </motion.div>
    </SpaceContainer>
  );
};

export default ContactMe;
