import React, { useState } from 'react';
import style from './Login.module.css';
import { Link } from 'react-router-dom';


function Reserva() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [telefono, setTelefono] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [usuarioCreado, setUsuarioCreado] = useState(false); // Estado para controlar si el usuario se ha creado exitosamente

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleCorreoChange = (e) => {
    setCorreo(e.target.value);
  };

  const handleContrasenaChange = (e) => {
    setContraseña(e.target.value);
  };

  const handleTelefonoChange = (e) => {
    setTelefono(e.target.value);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar acciones con los datos enviados, como enviarlos a un servidor
    console.log('Datos enviados:', {
      nombre,
      correo,
      contraseña,
      telefono
    });

    // Envío de datos al servidor
    fetch('http://localhost:3001/auth/registro', {
      method: 'POST',
      body: JSON.stringify({
        nombre,
        correo,
        contraseña,
        telefono
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
      <Link className={style.linkContainer} to="/">
        <button className={style.botoncerrar} onClick={handleClose}>
          X
        </button>
      </Link>
      <div className={style.tamano}>
        <h3 className={style.title}>Crear Nueva Cuenta</h3>
        {usuarioCreado && (
          <div className={style.mensajeExito}>Usuario creado con éxito</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label htmlFor="nombre" className={style.label}>
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              className={style.input}
              value={nombre}
              onChange={handleNombreChange}
              required
            />
          </div>
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
              onChange={handleContrasenaChange}
              required
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="telefono" className={style.label}>
              Teléfono:
            </label>
            <input
              type="tel"
              id="telefono"
              className={style.input}
              value={telefono}
              onChange={handleTelefonoChange}
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

export default Reserva;
