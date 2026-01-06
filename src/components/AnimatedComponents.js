import React, { useEffect, useState, useRef } from "react";
import Asteroid3D from "./Asteroid3D";
import "@styles/index.css";

const StarField = () => {
  const [stars, setStars] = useState([]);

  // Generate random stars
  useEffect(() => {
    const numStars = 50;
    const newStars = [];

    for (let i = 0; i < numStars; i++) {
      const size = Math.random() * 2 + 0.5;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const opacity = 0.3 + Math.random() * 0.7; // Fixed opacity, no animation

      newStars.push({ size, left, top, opacity });
    }

    setStars(newStars);
  }, []);

  return (
    <div className="stars">
      {stars.map((star, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: "white",
            borderRadius: "50%",
            top: `${star.top}%`,
            left: `${star.left}%`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
};

const AnimatedComponents = () => {
  const numAsteroids = 20;
  const [asteroids, setAsteroids] = useState([]);
  const asteroidsDataRef = useRef([]);

  useEffect(() => {
    // Initialize asteroids ONCE with fixed properties
    const initialAsteroids = [];
    for (let i = 0; i < numAsteroids; i++) {
      initialAsteroids.push({
        position: {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
        velocity: {
          x: (Math.random() - 0.1) * 10,
          y: (Math.random() - 0.1) * 2.5,
        },
        size: 0.4, // Fixed size for all asteroids (will be used in 3D)
      });
    }
    asteroidsDataRef.current = initialAsteroids;
    setAsteroids(initialAsteroids);
  }, []);

  useEffect(() => {
    if (asteroids.length === 0) return;

    const interval = setInterval(() => {
      // Update positions in ref (for Three.js to read)
      asteroidsDataRef.current = asteroidsDataRef.current.map((asteroid) => {
        let newX = asteroid.position.x + asteroid.velocity.x;
        let newY = asteroid.position.y + asteroid.velocity.y;
        let newVelocity = { ...asteroid.velocity };

        // Bounce off walls
        const asteroidSize = 30; // Fixed pixel size for collision
        if (
          newX - asteroidSize < 0 ||
          newX + asteroidSize > window.innerWidth
        ) {
          newVelocity.x = -newVelocity.x;
          newX = Math.max(
            asteroidSize,
            Math.min(window.innerWidth - asteroidSize, newX)
          );
        }

        if (
          newY - asteroidSize < 0 ||
          newY + asteroidSize > window.innerHeight
        ) {
          newVelocity.y = -newVelocity.y;
          newY = Math.max(
            asteroidSize,
            Math.min(window.innerHeight - asteroidSize, newY)
          );
        }

        return {
          ...asteroid,
          position: { x: newX, y: newY },
          velocity: newVelocity,
        };
      });

      // Update state (triggers re-render but Three.js reads from ref)
      setAsteroids([...asteroidsDataRef.current]);
    }, 16); // 60fps update

    return () => clearInterval(interval);
  }, [asteroids.length]);

  return (
    <div>
      <StarField />
      {asteroids.length > 0 && (
        <Asteroid3D asteroids={asteroidsDataRef.current} />
      )}
    </div>
  );
};

export default AnimatedComponents;
