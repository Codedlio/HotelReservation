import React, { useState } from 'react';
import { GoogleAuthProvider,signInWithPopup  } from "firebase/auth";
import { auth } from "../Loging/firebase";
import style from './Login2.module.css';
import { Link } from 'react-router-dom';
import validate from './validate';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUsuario } from '../redux/action';
import foto from './logo gogle.png'

function Login2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  
  const [form, setForm] = useState({correo:"",contraseña:""});
  const [errors, setErrors] = useState({count: 1});

  function changeHandler(e){  
    const property = e.target.name;
    const value = e.target.value;
    setForm({...form, [property]:value});
    setErrors(validate({...form, [property]:value}));
    return;
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const credentials = await signInWithPopup(auth, provider)
      //console.log(credentials);
      dispatch(setUsuario(credentials.user.email));
      
      if(window.sessionStorage.getItem('dataReservation')){
        navigate("/detalleReserva");
      }else{
        navigate("/")
      }
      
      // Close the login modal
      //const modalInstance = bootstrap.Modal.getInstance(googleButton.closest('.modal'));
      //modalInstance.hide();
      // show welcome message
      //showMessage("Welcome " + credentials.user.displayName);
    } catch (error) {
      console.log(error);
    }
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar acciones con los datos enviados, como enviarlos a un servidor
    // Envío de datos al servidor
    fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        correo: form.correo,
        contraseña: form.contraseña
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      // Manejar la respuesta del servidor
      if (response.ok) {
        dispatch(setUsuario(form.correo));
        if(window.sessionStorage.getItem('dataReservation')){
          navigate("/detalleReserva");
        }else{
          navigate("/")
        }
        
      }
    })
    .catch(error => {
      // Manejar errores
      alert("Se produjo un error: " + error.message);
    });
  };

  return (
    <div className={style.contenedor}>
      <Link className={style.linkContainer} to="/contenedor">
        <button className={style.botoncerrar} onClick={handleClose}>
          X
        </button>
      </Link>
      <div className={style.tamano}>
        <h3 className={style.title}>Ingresar</h3>
        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label htmlFor="correo" className={style.label}>
              Correo Electrónico:
            </label>
            <input
              type="email"
              name="correo"
              className={style.input}
              value={form.correo}
              onChange={changeHandler}
            />
            {errors.correo && <p>{errors.correo}</p>}
          </div>
          <div className={style.formGroup}>
            <label htmlFor="contraseña" className={style.label}>
              Contraseña:
            </label>
            <input
              type="password"
              name="contraseña"
              className={style.input}
              value={form.contraseña}
              onChange={changeHandler}
            />
            {errors.contraseña && <p>{errors.contraseña}</p>}
          </div>
          {errors.count < 1 ? (
						<button type="submit" className={style.button}>
							Enviar
						</button>
					) : (
						<button type="submit" disabled className={style.button}>
							Enviar
						</button>
					)} 
          <button type="button" onClick={handleLogin} className={style.buttongoogle}>
        Ingresar con Google
        <img src={foto} alt="Google logo" className={style.googleicon}/>
        
        </button>
        </form>
        
        
        
      </div>
    </div>
  );
}

export default Login2;
