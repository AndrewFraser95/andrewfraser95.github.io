import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Potato3D = ({ onClick }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // Transparent background
    mountRef.current.appendChild(renderer.domElement);

    // Create bean-shaped geometry - more rounded, less pointy
    const geometry = new THREE.SphereGeometry(2, 10, 14);
    
    // Deform the sphere to look more like a bean (rounded, smooth curves)
    const positions = geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      
   // Use smoother, gentler noise functions
      const noise1 = Math.sin(x * 2) * 0.12; // Reduced amplitude
      const noise2 = Math.cos(y * 2.5) * 0.1;
      const noise3 = Math.sin(z * 2) * 0.08;
      // const noise4 = Math.cos(x * 1.2 + y * 1.5) * 0.06;
      
      // Smooth the transitions
      const scale = 1 + noise1 + noise2 + noise3;
      
      // Make it bean-shaped: elongated but with smooth curves
      // Less extreme elongation, more rounded
      positions[i] = x * scale * 0.85; // Slightly narrower width
      positions[i + 1] = y * scale * 1.25; // Moderately taller (reduced from 1.4)
      positions[i + 2] = z * scale * 1.2; // Slightly narrower depth
      
      // Add smooth indentation on one side (bean characteristic)
      if (x > 0.3) {
        const indent = Math.sin((x - 0.3) * 2) * 0.01;
        positions[i] = positions[i] * (1 - indent);
      }
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();

    // Create wireframe material with yellow/brown colors
    const material = new THREE.MeshBasicMaterial({
      color: 0xd4a574, // Light brown/yellow
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });

    const potato = new THREE.Mesh(geometry, material);
    scene.add(potato);

    // Add accent lines with darker brown
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x8b6914, // Darker brown
      linewidth: 2,
    });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    potato.add(wireframe);

    // Add some additional detail lines with medium brown
    const detailEdges = new THREE.EdgesGeometry(geometry);
    const detailMaterial = new THREE.LineBasicMaterial({
      color: 0xb8860b, // Medium brown
      linewidth: 1,
      transparent: true,
      opacity: 0.6,
    });
    const detailWireframe = new THREE.LineSegments(detailEdges, detailMaterial);
    potato.add(detailWireframe);

    // Add ambient light for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point lights for depth
    const pointLight1 = new THREE.PointLight(0xffd700, 0.4);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b6914, 0.3);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    // Animation
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      // Rotate the potato slowly
      potato.rotation.x += 0.003;
      potato.rotation.y += 0.005;
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
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
      geometry.dispose();
      material.dispose();
      lineMaterial.dispose();
      detailMaterial.dispose();
      edges.dispose();
      detailEdges.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        cursor: "pointer",
      }}
      onClick={onClick}
    />
  );
};

export default Potato3D;
