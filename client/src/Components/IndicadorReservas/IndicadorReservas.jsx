import React from "react";
import style from "./IndicadorReservas.module.css";
import NavBar from '../NavBar/NavBar';
import FooterBar from '../FooterBar/FooterBar'


function IndicadorReservas() {
  
  return (
    
    <div className={style.body}>
    <NavBar />   
    <div className={style.container}>         
      <h2>Indicador de Reservas</h2>  
      <div className={style.centerleft}></div>  
      <p></p>
    </div>
    <FooterBar/>
</div>
      
    
  );
}

export default IndicadorReservas;
