import React from "react";
import style from "./Historia.module.css";
import Imagen from "./img/puesta-del-sol.jpg";
import Imagen1 from "./img/día-soleado.jpg";
import NavBar from '../NavBar/NavBar';



function Historia() {
  
  return (
    
    <div className={style.body}>
      <NavBar />   
      <div className={style.container}>  
        <img src={Imagen} className={style.Image}  alt="puesta-del-sol" ></img> 
        <h2 className={style.title} >Historia</h2>  
        <div className={style.centerleft}></div>  
        <p className={style.parrafo1}>
        Somos un grupo de amigos de diferentes nacionalidades que nos conocimos en el bootcam de Henry y tuvimos la visión a inicios de este año realizar este proyecto y desde un comienzo nos gustó la idea de elegir un lugar alejado de la ciudad, nos propusimos construir una página web para un hotel ubicado en medio de la montaña. A nosotros nos gusta rodearnos de la naturaleza y disfrutar de las vistas más impresionantes que pueda brindarnos. 
        Esa es la razón por la que nos unimos y pusimos en marcha este proyecto. De esta manera pensamos en juntarnos todos y crear la web Eterno Hotel.</p>
      </div>
      <div className={style.container}>  
        <div className={style.centerleft}></div>  
        <p className={style.parrafo2}>
        Con el tiempo también nos gustaría implementar servicios adicionales como salas de meditación, yoga, masajes y caminatas por los alrededores de Eterno.  De esta manera, queremos ofrecer un lugar alejado, para quitarnos el estrés que nos puede generar la vida en la ciudad y conectarse con uno mismo en familia, amigos o en pareja.</p>
        <img src={Imagen1} className={style.Image}  alt="día_soleado" ></img> 
      </div>
  </div>
    
  );
}

export default Historia;
