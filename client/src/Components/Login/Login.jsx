import React, { useState } from 'react';
import style from './Login.module.css';
import { Link } from 'react-router-dom';

function Reserva() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleApellidoChange = (e) => {
    setApellido(e.target.value);
  };

  const handleCorreoChange = (e) => {
    setCorreo(e.target.value);
  };

  const handleContrasenaChange = (e) => {
    setContrasena(e.target.value);
  };

  const handleTelefonoChange = (e) => {
    setTelefono(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar acciones con los datos enviados, como enviarlos a un servidor
    console.log('Datos enviados:', {
      nombre,
      apellido,
      correo,
      contrasena,
      telefono
    });
  };

  return (
    <div className={style.contenedor}>
      <div className={style.tamano}>
        <h3 className={style.title}>Reserva tu estadía</h3>
        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label htmlFor="nombre" className={style.label}>
              Nombre y Apellido:
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
            <label htmlFor="contrasena" className={style.label}>
              Contraseña:
            </label>
            <input
              type="password"
              id="contrasena"
              className={style.input}
              value={contrasena}
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
          <button type="submit" className={style.button}>Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default Reserva;
