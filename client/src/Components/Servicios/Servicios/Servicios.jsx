import React from "react";
import { Link } from "react-router-dom";
import styles from "./Servicios.module.css";
import image1 from './imagenes/image1.png'
import image2 from './imagenes/image2.jpg'

const Servicios = () => {
  return (
    
    <div className={styles.container}>
        <div className={styles.titulo}>
        <h2>Descubre<br></br> Nuestros<br></br> Programas</h2>
    </div>
      <div className={styles.buttonContainer1}>
        <Link to="/piscina"  className={styles.button}>
          <img src={image2} alt="Imagen 1" />
          <span className={styles.text} >Piscinas Termales con<br />temperaturas entre 35<br />y 40 grados</span>
        </Link>
      </div>
      <div className={styles.buttonContainer2}>
        <Link to="/trekking" className={styles.button}>
          <img src={image1} alt="Imagen 2" />
          <span className={styles.text}>Trekking</span>
        </Link>
      </div>
    </div>
    
  );
};

export default Servicios;

