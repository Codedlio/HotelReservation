import React, { useState } from 'react';
import style from './Contacto.module.css';
import NavBar from '../NavBar/NavBar';
import FooterBar from '../FooterBar/FooterBar';
import PreguntasFrecuentes from '../Preguntas  Frecuentes/Preguntas';
import { useDispatch } from "react-redux"
import validate from './validate';
import {sugerenciaCliente} from '../redux/action.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

function CentroDeAyuda() {
 const dispatch =useDispatch();

  const [showTextArea, setShowTextArea] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [userData, setUserData] = useState({
    name:'',
    email:'',
    phone:'',
    subject:'',
    description:'',    
  })
  const [error , setError] = useState({
    name:'',
    email:'',
    phone:'',
    subject:'',
    description:'',    
  })

  const handlerInput = (event) => {
    setUserData({
        ...userData, [event.target.name]: event.target.value
    });
    setError(validate({...userData, [event.target.name]: event.target.value}));
 
};
const handleSubmit=async(e)=>{
  e.preventDefault();
try {
  if(Object.values(error).length >0) {
    return alert("Please verify that all fields are filled in correctly");
  } else {
    dispatch(sugerenciaCliente(userData));
    alert("Envio exitoso");
    setUserData({
      name:'',
      email:'',
      phone:'',
      subject:'',
      description:'',    
    })
  }
} catch (error) {
  alert("Error cargue los datos Nuevo");
}

}

  const handleReclamosClick = (event) => {
    setShowTextArea(true);
    setShowButton(false);
   
    

  };

  return (
    <div className={style.container}>
      <NavBar />
      
      <PreguntasFrecuentes />
      <div className={style.container2}>
      <h1 className={style.title}>Centro de Ayuda</h1>

      <div className={style.section}>
        <h2 className={style.sectionTitle}>Contáctanos</h2>
        <p className={style.contactText}>
          Si tienes alguna otra pregunta o necesitas más ayuda,<br></br> no dudes en contactarnos.
        </p>
        <div className={style.contactItem}>
          <FontAwesomeIcon icon={faPhone} className={style.contactIcon} />
          <span className={style.contactLabel}>Teléfono:</span> (+123) 456-7890
        </div>
        <div className={style.contactItem}>
          <FontAwesomeIcon icon={faEnvelope} className={style.contactIcon} />
          <span className={style.contactLabel}>Correo electrónico:</span> hoteltermaleterno@gmail.com
        </div>
        <div className={style.contactItem}>
          <FontAwesomeIcon icon={faMapMarkerAlt} className={style.contactIcon} />
          <span className={style.contactLabel}>Dirección:</span> Calle Principal 123, Termas Huife
        </div>
      </div>

     
      <form onSubmit={handleSubmit} className={style.section}>
          <h2 className={style.sectionTitle}>Escríbenos</h2>
          <div className={style.contactForm}>
          <div className={style.contactItem}>
            <input type="text" id="name" value={userData.name} onChange={handlerInput} name={"name"} className={style.contactInput} placeholder="Ingresa tu nombre" required />
          </div>
          {error.name && <p>{error.name}</p>}

          <div className={style.contactItem}>
            <input type="email" id="email" value={userData.email} onChange={handlerInput} name={"email"}className={style.contactInput} placeholder="Ingresa tu correo electrónico" required />
          </div>
          {error.email && <p>{error.email}</p>}

          <div className={style.contactItem}>
            <input type="tel" id="phone" value={userData.phone} onChange={handlerInput} name={"phone"} className={style.contactInput} placeholder="Ingresa tu número de teléfono" required />
          </div>
          {error.phone && <p>{error.phone}</p>}

          <div className={style.contactItem}>
            <select id="message" name ='subject'className={style.contactSelect} required>
              <option value="">Asunto</option>
              <option value="termas">Termas</option>
              <option value="alojamiento">Alojamiento</option>
              <option value="restaurant">Restaurant</option>
              <option value="actividades">Actividades</option>
            </select>
          </div>
          {error.description && <p>{error.description}</p>}
          {/* <div className={style.contactItem}>
                <button type="submit" className={style.contactButtonenviar}>Enviar</button>
              </div>
           */}
          {/* {showButton && (
            <div className={style.contactItem}>
              <button className={style.contactButtonreclamo} onClick={handleReclamosClick}>
                RECLAMOS Y SUGERENCIAS
              </button>
            </div>
          )} */}
          
            <>
              <div className={style.contactItem}>
                <textarea id="reclamo" value={userData.description} onChange={handlerInput} name={'description'} className={style.contactTextarea} placeholder="Escribe tu reclamo o sugerencia" required></textarea>
              </div>
              <div className={style.contactItem}>
                <button type="submit" className={style.enviar}>Enviar</button>
              </div>
            </>
        </div>
      </ form >
      </div>
      <FooterBar className={style.footer} />
      
    </div>
  );
}

export default CentroDeAyuda;
