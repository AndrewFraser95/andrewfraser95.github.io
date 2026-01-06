import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Asteroid3D = ({ asteroids }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const animationFrameRef = useRef(null);
  const asteroidsRef = useRef([]);
  const asteroidsInitialized = useRef(false);
  const asteroidsDataRef = useRef(asteroids);

  useEffect(() => {
    if (!mountRef.current || asteroidsInitialized.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Asteroid colors - greys, blacks, and browns
    const asteroidColors = [
      0x4a4a4a, // Dark grey
      0x2c2c2c, // Very dark grey
      0x1a1a1a, // Almost black
      0x5a4a3a, // Brown-grey
      0x3a2a1a, // Dark brown
      0x6b5b4b, // Medium brown-grey
      0x2a2a2a, // Charcoal
      0x4a3a2a, // Brown
    ];

    // Create all asteroids ONCE with fixed properties
    asteroids.forEach((asteroidData, index) => {
      // Fixed size for this asteroid (convert from pixel size to 3D scale)
      const baseSize = 0.15; // Fixed base size
      const geometry = new THREE.IcosahedronGeometry(baseSize, 0);
      
      // Deform it to look more like an asteroid (fixed deformation)
      const positions = geometry.attributes.position.array;
      const randomSeed = index * 1000; // Use index as seed for consistent deformation
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        
        // Use seeded random for consistent shape
        const noise1 = Math.sin(x * 4 + randomSeed) * 0.25;
        const noise2 = Math.cos(y * 5 + randomSeed) * 0.2;
        const noise3 = Math.sin(z * 3.5 + randomSeed) * 0.22;
        const noise4 = Math.cos(x * 2 + y * 3 + randomSeed) * 0.15;
        
        const scale = 1 + noise1 + noise2 + noise3 + noise4;
        positions[i] = x * scale;
        positions[i + 1] = y * scale;
        positions[i + 2] = z * scale;
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();

      // Fixed color for this asteroid (use index to pick consistently)
      const baseColor = asteroidColors[index % asteroidColors.length];

      // Create wireframe material
      const material = new THREE.MeshBasicMaterial({
        color: baseColor,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      });

      const asteroid = new THREE.Mesh(geometry, material);
      
      // Initial position
      const x = (asteroidData.position.x / window.innerWidth) * 10 - 5;
      const y = -(asteroidData.position.y / window.innerHeight) * 10 + 5;
      asteroid.position.set(x, y, 0);
      asteroid.userData = { index }; // Store index for position updates
      
      asteroidsRef.current.push(asteroid);
      scene.add(asteroid);

      // Add accent lines
      const edges = new THREE.EdgesGeometry(geometry);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: baseColor * 0.7,
        linewidth: 1,
      });
      const wireframe = new THREE.LineSegments(edges, lineMaterial);
      asteroid.add(wireframe);
    });

    asteroidsInitialized.current = true;

    // Animation loop - only updates positions and rotations
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      // Update asteroid positions and rotations
      asteroidsRef.current.forEach((asteroid, index) => {
        // Rotate (consistent rotation)
        asteroid.rotation.x += 0.01;
        asteroid.rotation.y += 0.015;
        asteroid.rotation.z += 0.008;
        
        // Update position from asteroids data ref
        const currentAsteroids = asteroidsDataRef.current;
        if (currentAsteroids[index]) {
          const x = (currentAsteroids[index].position.x / window.innerWidth) * 10 - 5;
          const y = -(currentAsteroids[index].position.y / window.innerHeight) * 10 + 5;
          asteroid.position.set(x + 100, y - 100, 0);
        }
      });
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      asteroidsRef.current.forEach((asteroid) => {
        asteroid.geometry.dispose();
        asteroid.material.dispose();
        asteroid.children.forEach((child) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        });
      });
      renderer.dispose();
      asteroidsInitialized.current = false;
    };
  }, []); // Empty dependency - only create once

  // Update asteroids data ref when props change (for animation loop to read)
  useEffect(() => {
    asteroidsDataRef.current = asteroids;
  }, [asteroids]);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
};

export default Asteroid3D;
