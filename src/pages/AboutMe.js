import React from "react";
import { motion } from "framer-motion";
import { SpaceContainer } from "@components/StyledComponents";
import { useNavigate } from "react-router-dom";
import "@styles/AboutMe.css";

const AboutMe = () => {
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
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="about-header" variants={itemVariants}>
          <h1>Andrew Fraser</h1>
          <p className="subtitle">Senior Product Developer & Creative Technologist</p>
        </motion.div>

        <motion.div className="about-content" variants={itemVariants}>
          <div className="about-section">
            <h2>Who I Am</h2>
            <p>
              I'm a 28-year-old developer currently working at AND Digital as a
              Senior Product Developer, delivering high-quality frontend applications 
              and websites for a variety of clients. I help teams improve their Agile 
              practices and continuously upskill team members.
            </p>
            <p>
              Previously, I worked at High Speed Training in their Learner Engagement 
              team, focusing on user engagement analytics using Azure Application Insights, 
              creating templates for content authors in our Angular SPA, expanding RESTful 
              API functionality, and maintaining excellent Lighthouse scores across all pages.
            </p>
          </div>

          <div className="about-section">
            <h2>Life Beyond Code</h2>
            <p>
              When I'm not coding, I enjoy automating things around my house, reading 
              books outside, and getting a bit too competitive at pub quizzes. I live 
              with my partner Charley, and we're planning to get chickens named Jelly, 
              Jammy, and Gemma when we buy a house.
            </p>
          </div>

          <div className="about-section">
            <h2>What I Do Here</h2>
            <p>
              This is my personal website to host cool ideas, projects, and links—a 
              space to work on something outside of client work.
            </p>
          </div>

          <div className="about-section">
            <h2>Projects & Experience</h2>
            <div className="project-card">
              <h3>Enterprise Development</h3>
              <p>
                I've worked with various clients at AND Digital, including extremely 
                large-scale websites for well-known companies. I deliver performant work 
                on time to the highest standards, quickly advancing within the company 
                and receiving excellent feedback.
              </p>
            </div>

            <div className="project-card">
              <h3>Artificial Intelligence</h3>
              <p>
                I came third in a ChatGPT Builder competition at AND Digital, creating 
                a GPT that helps ANDI's progress their careers, track skills, and access 
                training links. I've also assisted external businesses with training, 
                upskilling, and prototyping a Quote builder that enables massive time 
                savings.
              </p>
            </div>

            <div className="project-card">
              <h3>Digital Security</h3>
              <p>
                In 2016, I gave a presentation on Digital Footprints, demonstrating how 
                to acquire extensive personal information about individuals—their family 
                members, finances, and political views—to illustrate social engineering 
                risks. I concluded with practical tips on securing yourself and your 
                loved ones online.
              </p>
            </div>

            <div className="project-card">
              <h3>Neural Networks</h3>
              <p>
                My University dissertation was titled "Sentiment Analysis on Shakespeare 
                Sonnets written using Andrej Karpathy's Recurrent Neural Network." I 
                trained an RNN on all of Shakespeare's Sonnets and achieved 83% valid 
                words—only 6.6% behind Shakespeare's 89.6% accuracy. This was remarkable 
                considering the RNN started with no knowledge of English and no human 
                emotional experience.
              </p>
            </div>

            <div className="project-card">
              <h3>iOS Development</h3>
              <p>
                I worked with the National Railway Museum (NRM) to create "Fallen 
                Railwaymen," an iOS app that made their database of 11,000 World War 
                soldiers accessible to a wider audience. The app featured Apple Maps 
                integration, interactive quizzes, and efficient search functionality 
                across all iOS devices.
              </p>
            </div>
          </div>
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

export default AboutMe;
