import React from "react";
import style from "./Caracteristicas.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faMoneyBill, faPersonBooth  } from '@fortawesome/free-solid-svg-icons';



function Caracteristicas() {
  return (
    <div className={style.container}>
      {/* <h2 className={style.title}>Características</h2> */}
      
  
    <div className={style.centerleft}>
    <div>
    <div className={style.image1}><FontAwesomeIcon icon={faBed}  /></div>
      
     
      
    </div>
      <p>La mayoria de nuestras habitaciones poseen,<br></br>
       una cama súper King o King size, TV cable y <br></br>
       baño privado mesa de desayuno, TV<br></br> 
       cable, caja de seguridad, minibar, jardín <br></br>
       privado, batas, desayuno buffet y vistas<br></br>
        exepcionales.</p>
    </div>
  
  
    <div className={style.centerrigth}>
    <div className={style.image2}>< FontAwesomeIcon icon={faPersonBooth} /></div>
      <p>Habitaciones con capacidad hasta un<br></br> máximo de 7 personas.</p>
    </div>
  
  
    <div className={style.center}>
    <div className={style.image3}>< FontAwesomeIcon icon={faMoneyBill} /></div>
     
      <p>Revisa el detalle de nuestras habitaciones <br></br>y sus respectivas caracteristicas y precios.</p>
    </div>
 
</div>
    
  );
}

export default Caracteristicas;
