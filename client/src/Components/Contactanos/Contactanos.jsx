import React from 'react';
import style from './Contactanos.module.css';
import NavBar from '../NavBar/NavBar';
import FooterBar from '../FooterBar/FooterBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

function CentroDeAyuda() {
  return (
    <div className={style.container}>
      <NavBar />
      <h1 className={style.title}>Centro de Ayuda</h1>

      <div className={style.section}>
        <h2 className={style.sectionTitle}>Contáctanos</h2>
        <p className={style.contactText}>
          Si tienes alguna otra pregunta o necesitas más ayuda, no dudes en contactarnos.
        </p>
        <div className={style.contactItem}>
        <FontAwesomeIcon icon={faPhone} className={style.contactIcon} />
          <span className={style.contactLabel}>Teléfono:</span> (+123) 456-7890
        </div>
        <div className={style.contactItem}>
        <FontAwesomeIcon icon={faEnvelope} className={style.contactIcon} />
          <span className={style.contactLabel}>Correo electrónico:</span> info@termashuife.cl
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
            
            <textarea id="message" className={style.contactTextarea} placeholder="Mensaje" required></textarea>
          </div>
          
          <div className={style.contactItem}>
            <button className={style.contactButton}>Enviar</button>
          </div>
        </div>
      </section>

      <FooterBar className={style.footer} />
    </div>
  );
}

export default CentroDeAyuda;
