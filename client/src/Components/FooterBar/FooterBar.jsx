import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import style from "./FooterBar.module.css";
import imagen from './logo hotel.png'

function FooterBar() {
  return (
    <div className={style.footerBar}>
      <div className={style.logo}>
        <img src={imagen} alt="Logo" />
      </div>
      <div className={style.linkawesome}>
        <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
        <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
        <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
      </div>
      <p className={style.footerText}>&copy; 2023 Nombre Hotel. Todos los derechos reservados.</p>
    </div>
  );
}

export default FooterBar;