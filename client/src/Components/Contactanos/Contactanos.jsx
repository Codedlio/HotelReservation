import React, { useState } from 'react';
import style from './Contactanos.module.css';
import NavBar from '../NavBar/NavBar';
import FooterBar from '../FooterBar/FooterBar';
import PreguntasFrecuentes from '../Preguntas  Frecuentes/Preguntas';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

function CentroDeAyuda() {
  const [showTextArea, setShowTextArea] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const handleReclamosClick = () => {
    setShowTextArea(true);
    setShowButton(false);
  };

  return (
    <div className={style.container}>
      <NavBar />
      
      <PreguntasFrecuentes />
      <div className={style.container2}>
      <h1 className={style.title}>Centro de Ayuda</h1>

      <div className={style.section}>
        <h2 className={style.sectionTitle}>Contáctanos</h2>
        <p className={style.contactText}>
          Si tienes alguna otra pregunta o necesitas más ayuda,<br></br> no dudes en contactarnos.
        </p>
        <div className={style.contactItem}>
          <FontAwesomeIcon icon={faPhone} className={style.contactIcon} />
          <span className={style.contactLabel}>Teléfono:</span> (+123) 456-7890
        </div>
        <div className={style.contactItem}>
          <FontAwesomeIcon icon={faEnvelope} className={style.contactIcon} />
          <span className={style.contactLabel}>Correo electrónico:</span> info@hoteleterno.com
        </div>
        <div className={style.contactItem}>
          <FontAwesomeIcon icon={faMapMarkerAlt} className={style.contactIcon} />
          <span className={style.contactLabel}>Dirección:</span> Calle Principal 123, Termas Huife
        </div>
      </div>

      <section className={style.section}>
        <h2 className={style.sectionTitle}>Escríbenos</h2>
        <div className={style.contactForm}>
          <div className={style.contactItem}>
            <input type="text" id="name" className={style.contactInput} placeholder="Ingresa tu nombre" required />
          </div>
          <div className={style.contactItem}>
            <input type="email" id="email" className={style.contactInput} placeholder="Ingresa tu correo electrónico" required />
          </div>
          <div className={style.contactItem}>
            <input type="tel" id="phone" className={style.contactInput} placeholder="Ingresa tu número de teléfono" required />
          </div>
          <div className={style.contactItem}>
            <select id="message" className={style.contactSelect} required>
              <option value="">Asunto</option>
              <option value="termas">Termas</option>
              <option value="alojamiento">Alojamiento</option>
              <option value="restaurant">Restaurant</option>
              <option value="actividades">Actividades</option>
            </select>
          </div>

          <div className={style.contactItem}>
                <button className={style.contactButtonenviar}>Enviar</button>
              </div>
          {showButton && (
            <div className={style.contactItem}>
              <button className={style.contactButtonreclamo} onClick={handleReclamosClick}>
                RECLAMOS Y SUGERENCIAS
              </button>
            </div>
          )}
          {showTextArea && (
            <>
              <div className={style.contactItem}>
                <textarea id="reclamo" className={style.contactTextarea} placeholder="Escribe tu reclamo o sugerencia" required></textarea>
              </div>
              <div className={style.contactItem}>
                <button className={style.enviar}>Enviar Reclamo o Sugerencia</button>
              </div>
            </>
          )}
        </div>
      </section>
      </div>
      <FooterBar className={style.footer} />
      
    </div>
  );
}

export default CentroDeAyuda;
