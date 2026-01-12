// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import AboutMe from "./AboutMe";
import ContactMe from "./ContactMe";
import Privacy from "./Privacy";
import Terms from "./Terms";
import CaliBir from "./CaliBir";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="Home" element={<Home />} />
        <Route path="AboutMe" element={<AboutMe />} />
        <Route path="ContactMe" element={<ContactMe />} />
        <Route path="CaliBir" element={<CaliBir />} />
        <Route path="CaliBir/Privacy" element={<Privacy />} />
        <Route path="CaliBir/Terms" element={<Terms />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
