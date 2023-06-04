import style from './Infohotel.module.css';
import Image from '../InfoHotel/img/vista-montaña.jpg';
// import Image1 from '../InfoHotel/img/alar-eterno.jpg';
// import Image2 from '../InfoHotel/img/piscina.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import imagen from '../NavBar/logo hotel.png';
import { Nav } from 'rsuite';
import NavBar from '../NavBar/NavBar';
import { faBed, faMoneyBill, faPersonBooth  } from '@fortawesome/free-solid-svg-icons';

function Infohotel() {
 
   // document.getElementById("filosofia").style.display = 'none';
  // document.getElementById("bienestar").style.display = 'none';
   
  return (
    <div className={style.container}>
    <NavBar />
    <h2 className={style.title}>Características</h2>
    

  <div className={style.centerleft}>
  <div>
  <div className={style.image1}><FontAwesomeIcon icon={faBed}  /></div>
    
   
    
  </div>
    <p>La mayoria de nuestras habitaciones poseen, una cama <br></br>súper King, TV cable y baño en  suite con ducha de agua<br></br> termal, 1 habitación con dos camas  de una plaza, dos uno<br></br>baños,  con bañera de agua termal y el segundo con ducha<br></br> de agua termal, living con cama Nido (para 2 personas),<br></br> futón para una persona, mesa de desayuno, TV cable,<br></br> caja de seguridad, minibar, jardín privado, batas, <br></br>desayuno buffet y vistas al bosque.</p>
  </div>


  <div className={style.centerrigth}>
  <div className={style.image2}>< FontAwesomeIcon icon={faPersonBooth} /></div>
    <p>Este tipo de habitación se encuentra disponible para un<br></br> máximo de 7 personas.</p>
  </div>


  <div className={style.center}>
  <div className={style.image3}>< FontAwesomeIcon icon={faMoneyBill} /></div>
   
    <p>Revisa el detalle de los valores de esta habitación en nuestra <br></br>política de precios y estadía en nuestro Centro de Ayuda.</p>
  </div>

</div>
  );
}
export default Infohotel;
