import React, { useState } from 'react';
import style from './Login2.module.css';
import { Link } from 'react-router-dom';
import validate from './validate';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUsuario } from '../redux/action';

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
        dispatch(setUsuario(form.correo));
        navigate("/");
      })
      .catch(error => {
        // Manejar errores
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
        </form>
      </div>
    </div>
  );
}

export default Login2;
