import React from "react";
import { motion } from "framer-motion";
import { SpaceContainer } from "@components/StyledComponents";
import { useNavigate } from "react-router-dom";
import "@styles/CaliBir.css";

const CaliBir = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <SpaceContainer>
      <motion.div
        className="calibir-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="calibir-hero" variants={itemVariants}>
          <h1 className="calibir-title">Stop Scrolling. Start Connecting.</h1>
          <h2 className="calibir-subtitle">
            The App That Actually Reduces Your Screen Time While Keeping You
            Closer to Friends
          </h2>
          <p className="calibir-tagline">
            CaliBir helps you remember what matters: birthdays, events, and the
            people you care about—without the endless scrolling.
          </p>
        </motion.div>

        <motion.div className="calibir-features" variants={itemVariants}>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Less Screen Time, More Real Time</h3>
            <p>
              Get birthday reminders and event notifications without falling
              into the social media rabbit hole. Quick, focused, and meaningful.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎂</div>
            <h3>Never Miss a Birthday Again</h3>
            <p>
              Automatic birthday reminders sync with your calendar. Stay
              connected with friends without the constant checking.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎉</div>
            <h3>Plan Events That Actually Happen</h3>
            <p>
              Create and manage events with friends. Share photos, coordinate
              plans, and make memories—not just likes.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Real Friends, Real Connections</h3>
            <p>
              Connect with people you actually know. No algorithms, no ads, just
              genuine relationships.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👨‍👩‍👧‍👦</div>
            <h3>Build Your Community Groups</h3>
            <p>
              Create and join groups with your community—family, friends, clubs,
              or any circle that matters. Organize events, share moments, and
              stay connected with the people who share your interests.
            </p>
          </div>

          <div className="feature-card coming-soon">
            <div className="feature-icon">✨</div>
            <h3>More Features Coming Soon</h3>
            <p>
              We're constantly working on new features to help you stay
              connected and reduce screen time. Stay tuned for exciting updates!
            </p>
          </div>
        </motion.div>

        <motion.div className="calibir-screenshots" variants={itemVariants}>
          <h2 className="screenshots-title">See CaliBir in Action</h2>
          <div className="screenshots-grid">
            <div className="screenshot-frame">
              <div className="screenshot-placeholder ios">
                <div className="phone-notch"></div>
                <div className="screenshot-content">
                  <div className="screenshot-text">iOS Screenshot</div>
                  <div className="screenshot-subtext">Coming Soon</div>
                </div>
              </div>
              <p className="screenshot-label">iPhone</p>
            </div>
            <div className="screenshot-frame">
              <div className="screenshot-placeholder android">
                <div className="screenshot-content">
                  <div className="screenshot-text">Android Screenshot</div>
                  <div className="screenshot-subtext">Coming Soon</div>
                </div>
              </div>
              <p className="screenshot-label">Android</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="calibir-cta" variants={itemVariants}>
          <h2 className="cta-title">Ready to Reclaim Your Time?</h2>
          <p className="cta-subtitle">
            Join thousands who are choosing meaningful connections over mindless
            scrolling.
          </p>
          <div className="store-buttons">
            <a
              href="https://apps.apple.com/app/calibir"
              target="_blank"
              rel="noopener noreferrer"
              className="store-button apple"
            >
              <svg
                className="store-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C1.79 15.25 2.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <div className="store-button-text">
                <div className="store-button-label">Download on the</div>
                <div className="store-button-name">App Store</div>
              </div>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.calibir"
              target="_blank"
              rel="noopener noreferrer"
              className="store-button google"
            >
              <svg
                className="store-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="store-button-text">
                <div className="store-button-label">Get it on</div>
                <div className="store-button-name">Google Play</div>
              </div>
            </a>
          </div>
        </motion.div>

        <motion.div className="calibir-stats" variants={itemVariants}>
          <div className="stat-item">
            <div className="stat-number">-40%</div>
            <div className="stat-label">Screen Time Reduction</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">3x</div>
            <div className="stat-label">More Real Connections</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">No Ads, No Algorithms</div>
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

        <motion.button
          className="contact-button"
          onClick={() => navigate("/CaliBir/Privacy")}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 8px 30px rgba(0, 212, 255, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          Privacy
        </motion.button>
        <motion.button
          className="contact-button"
          onClick={() => navigate("/CaliBir/Terms")}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 8px 30px rgba(0, 212, 255, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          Terms
        </motion.button>
      </motion.div>
    </SpaceContainer>
  );
};

export default CaliBir;
