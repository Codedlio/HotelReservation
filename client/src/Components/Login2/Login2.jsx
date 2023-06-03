import React, { useState } from 'react';
import style from './Login2.module.css';
import { Link } from 'react-router-dom';

function Login2() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [usuarioCreado, setUsuarioCreado] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleCorreoChange = (e) => {
    setCorreo(e.target.value);
  };

  const handleContraseñaChange = (e) => {
    setContraseña(e.target.value);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar acciones con los datos enviados, como enviarlos a un servidor
    console.log('Datos enviados:', {
      correo,
      contraseña
    });

    // Envío de datos al servidor
    fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        correo,
        contraseña
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        // Manejar la respuesta del servidor
        if (response.ok) {
          setUsuarioCreado(true); // Actualizar el estado para indicar que el usuario se ha creado exitosamente
        }
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
        {usuarioCreado && (
          <div className={style.mensajeExito}>Usuario creado con éxito</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label htmlFor="correo" className={style.label}>
              Correo Electrónico:
            </label>
            <input
              type="email"
              id="correo"
              className={style.input}
              value={correo}
              onChange={handleCorreoChange}
              required
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="contraseña" className={style.label}>
              Contraseña:
            </label>
            <input
              type="password"
              id="contraseña"
              className={style.input}
              value={contraseña}
              onChange={handleContraseñaChange}
              required
            />
          </div>
          <button type="submit" className={style.button}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login2;
