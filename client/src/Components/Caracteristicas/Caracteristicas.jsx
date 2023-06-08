import React from "react";
import style from "./Caracteristicas.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faMoneyBill, faPersonBooth  } from '@fortawesome/free-solid-svg-icons';



function Caracteristicas() {
  return (
    <div className={style.container}>
      <h2 className={style.title}>Características</h2>
      
  
    <div className={style.centerleft}>
    <div>
    <div className={style.image1}><FontAwesomeIcon icon={faBed}  /></div>
      
     
      
    </div>
      <p>La mayoria de nuestras habitaciones poseen, una cama <br></br>súper King, TV cable y baño en  suite con ducha de agua<br></br> termal, 1 habitación con dos camas de una plaza, dos uno<br></br>baños,  con bañera de agua termal con ducha<br></br> de agua termal, living con posibilidad de cama Nido,<br></br> futón para una persona, mesa de desayuno, TV cable,<br></br> caja de seguridad, minibar, jardín privado, batas, <br></br>desayuno buffet y vistas al bosque.</p>
    </div>
  
  
    <div className={style.centerrigth}>
    <div className={style.image2}>< FontAwesomeIcon icon={faPersonBooth} /></div>
      <p>Nuestras habitaciones se encuentran disponibles para un<br></br> máximo de 7 personas.</p>
    </div>
  
  
    <div className={style.center}>
    <div className={style.image3}>< FontAwesomeIcon icon={faMoneyBill} /></div>
     
      <p>Revisa el detalle de los valores de nuestras habitaciones en <br></br>política de precios y estadía en nuestro Centro de Ayuda.</p>
    </div>
 
</div>
    
  );
}

export default Caracteristicas;
