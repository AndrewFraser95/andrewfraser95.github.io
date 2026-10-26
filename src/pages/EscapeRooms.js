import React from "react";
import { Link } from "react-router-dom";
import { SpaceContainer } from "@components/StyledComponents";
import AnimatedComponents from "@components/AnimatedComponents";
import { ESCAPE_ROOMS } from "../data/apps";
import "@styles/Home.css";

const EscapeRooms = () => (
  <SpaceContainer className="home-scroll">
    <div className="home-content">
      <header className="home-hero">
        <h1 className="hero-title">Escape rooms</h1>
      </header>

      <section className="app-grid">
        {ESCAPE_ROOMS.map((room, i) => (
          <div className="app-card" key={room.id}>
            <span className="app-type">Room {i + 1}</span>
            <h3 className="app-name">{room.name}</h3>
            <p className="app-description">{room.description}</p>
            <a href={room.href} className="app-cta">
              Play
            </a>
          </div>
        ))}
      </section>

      <footer className="home-footer">
        <Link to="/">Home</Link>
      </footer>
    </div>
    <AnimatedComponents />
  </SpaceContainer>
);

export default EscapeRooms;
