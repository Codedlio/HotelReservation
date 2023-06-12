import React, { useEffect, useState } from 'react';
import { GoogleAuthProvider,signInWithPopup  } from "firebase/auth";
import { auth } from "../Loging/firebase";
import style from './Login2.module.css';
import { Link } from 'react-router-dom';
import validate from './validate';
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUsuario } from '../redux/action';
import foto from './logo gogle.png'
import getCustumer from "../../services/getCustumer";
import axios from "axios";
function Login2() {

  const usuario = useSelector(state => state.usuario);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  
  const [form, setForm] = useState({correo:"",contraseña:""});
  const [errors, setErrors] = useState({count: 1});
   
  // useEffect(() => { 
  //   if (usuario)    
  //       getCustumer(usuario)
  //       .then((res) => console.log(res.data))
  // }, [usuario])
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
      const user={
        correo:credentials.user.email,
        nombre:credentials.user.displayName  
      }
      
      dispatch(setUsuario(user.correo));
      const {data}= await axios.post("http://localhost:3001/payment/custumer", {
                correo:user.correo,
                nombre:user.nombre
        }); 
        window.localStorage.setItem("client", JSON.stringify(data.custumer));
        //console.log(data.custumer);
      if(window.localStorage.getItem("dataReservation")){
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
    if (response.ok) {
      
      return response.json(); // Devolver la promesa
    } else {
      throw new Error('Error en la respuesta del servidor');
    }
  })
  .then(data => {
    const user = {
      email: form.correo,
      name: data.usuario
    };
    dispatch(setUsuario(form.correo));
    fetch("http://localhost:3001/payment/custumer", {
        method: 'POST',
        body: JSON.stringify({correo:user.email,nombre:data.usuario}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        return  response.json()
        
      })
      .then(data => {
        console.log(data);
        window.localStorage.setItem("client", JSON.stringify(data.custumer));
      })
    if (window.localStorage.getItem('dataReservation')) {
      navigate("/detalleReserva");
    } else {
      navigate("/");
    }
  })
  .catch(error => {
    alert("Se produjo un error: " + error.message);
  })
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
