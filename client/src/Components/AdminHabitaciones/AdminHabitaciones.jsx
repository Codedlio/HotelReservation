import React from "react";
import style from "./AdminHabitaciones.module.css";
import NavBar from '../NavBar/NavBar';
import FooterBar from '../FooterBar/FooterBar'


function AdminHabitaciones() {
  
  return (
    
    <div className={style.body}>
    <NavBar />   
    <div className={style.container}>         
      <h2>Administrar Habitaciones</h2>  
      <div className={style.centerleft}></div>  
      <p></p>
    </div>
    <FooterBar/>
</div>
      
    
  );
}

export default AdminHabitaciones;
