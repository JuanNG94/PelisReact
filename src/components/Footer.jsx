import React from "react";
import "../styles/Footer.css";


function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} PelisReact — Todos los derechos reservados.</p>
      <div className="footer-links">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
      </div>
    </footer>
  );
}

export default Footer;
