import React from "react";
import style from "./Bienestar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faMoneyBill, faPersonBooth  } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../NavBar/NavBar';
import Imagen from "./img/yoga.jpg";
import Imagen1 from "./img/natacion.jpg";




function Bienestar() {
  
  return (
    
    <div className={style.body}>
    <NavBar />   
    <div className={style.container}>  
      <img src={Imagen} className={style.Image}  alt="yoga" ></img> 
      <h2 className={style.title} >Yoga</h2>  
      <div className={style.centerleft}></div>  
      <p className={style.parrafo1}>
      Ofrecemos clases de Yoga que nos ayuda a relajarnos,a reducir el estrés, a mejorar nuestra concentración y nos ayuda mejorar la confianza en uno mismo.Contamos con profesionales especializados en el tema. Nada mejor que iniciar el día con estas clases.</p>
    
    </div>
   
    <div className={style.container}>  
    <h2 className={style.title} >Natación</h2>  
      <div className={style.centerleft}></div>  
      <p className={style.parrafo2}>
      Este es un deporte que también ofrecemos ya que contamos una enorme piscina y con profesionales que se encuentran disponibles para impartir sus conocimientos con las personas que aún no saben nadar. Además la natación nos permite mejorar la capacidad cardiorrespiratoria, la fuerza, la resistencia y la elasticidad. </p>
      <img src={Imagen1} className={style.Image}  alt="natación" ></img> 
    </div>
</div>
  
    
  );
}

export default Bienestar;
