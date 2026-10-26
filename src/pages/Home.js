import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { SpaceContainer } from "@components/StyledComponents";
import Potato3D from "@components/Potato3D";
import AnimatedComponents from "@components/AnimatedComponents";
import { APPS, TYPES } from "../data/apps";
import "@styles/Home.css";

const AppCard = ({ app }) => {
  const cta = app.router ? (
    <Link to={app.href} className="app-cta">
      {app.cta}
    </Link>
  ) : (
    <a href={app.href} className="app-cta">
      {app.cta}
    </a>
  );

  return (
    <div className="app-card">
      <span className="app-type">{TYPES[app.type].label}</span>
      <h3 className="app-name">{app.name}</h3>
      <p className="app-description">{app.description}</p>
      {cta}
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const types = Object.keys(TYPES).filter((t) => APPS.some((a) => a.type === t));
  const apps = APPS.filter((a) => filter === "all" || a.type === filter);

  return (
    <SpaceContainer className="home-scroll">
      <div className="home-content">
        <header className="home-hero">
          <motion.div
            className="potato-wrapper"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Potato3D onClick={() => navigate("/AboutMe")} />
          </motion.div>
          <h1 className="hero-title">Andrew Fraser</h1>
        </header>

        {types.length > 1 && (
          <div className="filter-row" role="tablist" aria-label="Filter">
            {["all", ...types].map((id) => (
              <button
                key={id}
                role="tab"
                aria-selected={filter === id}
                className={`filter-chip${filter === id ? " active" : ""}`}
                onClick={() => setFilter(id)}
              >
                {id === "all" ? "All" : TYPES[id].filter}
              </button>
            ))}
          </div>
        )}

        <section className="app-grid">
          {apps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </section>

        <footer className="home-footer">
          <Link to="/AboutMe">About</Link>
          <Link to="/ContactMe">Contact</Link>
        </footer>
      </div>
      <AnimatedComponents />
    </SpaceContainer>
  );
};

export default Home;
