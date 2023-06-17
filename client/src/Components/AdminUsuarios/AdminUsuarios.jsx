import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import FooterBar from '../FooterBar/FooterBar';

const AdminUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
   
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get('/correo/:correo');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`/auth/usuario/:id`);
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <div>
        <NavBar />
      <h1>Usuarios</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario._id}>
            {usuario.correo}
            <button onClick={() => eliminarUsuario(usuario._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <FooterBar />
    </div>
  );
};

export default AdminUsuario;
