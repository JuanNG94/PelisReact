import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css"

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">🎬 PelisReact</div>
      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/contact">Contacto</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
