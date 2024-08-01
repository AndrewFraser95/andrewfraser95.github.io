import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../styles/index.css";

function getRandomColor() {
  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);
  const r = randomInt(0, 255);
  const g = randomInt(0, 255);
  const b = randomInt(0, 255);
  return `rgb(${r},${g},${b})`;
}

const StarField = () => {
  const [stars, setStars] = useState([]);

  // Generate random stars
  useEffect(() => {
    const numStars = 80; // Number of stars
    const newStars = [];

    for (let i = 0; i < numStars; i++) {
      const size = Math.random() * 3 + 1;
      const speed = Math.random() * 5 + 1;
      const left = Math.random() * 100;
      const top = Math.random() * 100;

      newStars.push({ size, speed, left, top });
    }

    setStars(newStars);
  }, []);

  return (
    <div className="stars">
      {stars.map((star, index) => (
        <motion.div
          key={index}
          style={{
            position: "absolute",
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: "white",
            borderRadius: "50%",
            top: `${star.top}%`,
            left: `${star.left}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: star.speed,
            yoyo: Infinity,
          }}
        ></motion.div>
      ))}
    </div>
  );
};

const Planet = ({ size, speed, startColor, endColor }) => {
  const [position, setPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const [velocity, setVelocity] = useState({
    x: (Math.random() - 0.5) * 4,
    y: (Math.random() - 0.5) * 4,
  });

  const controls = {
    scale: {
      to: 1.2,
      from: 0.8,
      yoyo: Infinity,
      duration: speed,
    },
    opacity: {
      to: 0.5,
      from: 1,
      yoyo: Infinity,
      duration: speed,
    },
  };

  const updatePosition = () => {
    const newVelocity = { ...velocity };
    const newX = position.x + newVelocity.x;
    const newY = position.y + newVelocity.y;

    if (newX - size / 2 < 0 || newX + size / 2 > window.innerWidth) {
      newVelocity.x = -newVelocity.x;
    }

    if (newY - size / 2 < 0 || newY + size / 2 > window.innerHeight) {
      newVelocity.y = -newVelocity.y;
    }

    setPosition({ x: newX, y: newY });
    setVelocity(newVelocity);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updatePosition();
    }, 16);

    return () => clearInterval(interval);
  }, [position, size, velocity]);

  return (
    <motion.div
      style={{
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        background: `linear-gradient(to bottom, ${startColor}, ${endColor})`,
        borderRadius: "50%",
        top: position.y - size / 2,
        left: position.x - size / 2,
      }}
      initial={{ opacity: 1, scale: controls.scale[1] }}
      animate={{ scale: controls.scale[1] }}
    ></motion.div>
  );
};

const AnimatedComponents = () => {
  const numPlanets = 10;

  const planets = [];
  for (let i = 0; i < numPlanets; i++) {
    planets.push(
      <Planet
        key={i}
        size={Math.random() * (i * 50) + 50}
        speed={Math.random() * 5}
        startColor={getRandomColor()}
        endColor={getRandomColor()}
      />
    );
  }

  return (
    <div>
      <StarField />
      <div className="planet-container" style={{ margin: 0 }}>
        {planets.map((planet) => planet)}
      </div>
    </div>
  );
};

export default AnimatedComponents;
