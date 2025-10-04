import React from "react";
import "../styles/Contact.css";

function Contact() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contacto</h1>
      <p className="contact-subtitle">
        ¿Tenés alguna consulta, sugerencia o problema con la app?  
        ¡Escribinos y te responderemos lo antes posible!
      </p>

      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="name">Nombre y Apellido</label>
          <input type="text" id="name" placeholder="Tu nombre" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" id="email" placeholder="tucorreo@email.com" required />
        </div>

        <div className="form-group">
          <label htmlFor="country">País</label>
          <input type="text" id="country" placeholder="Tu país" required />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Asunto</label>
          <input type="text" id="subject" placeholder="Motivo del mensaje" required />
        </div>

        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea id="message" rows="5" placeholder="Escribí tu mensaje..." required></textarea>
        </div>

        <button type="submit" className="contact-button">Enviar mensaje</button>
      </form>
    </div>
  );
}

export default Contact;
