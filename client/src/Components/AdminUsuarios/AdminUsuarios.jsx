import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import FooterBar from '../FooterBar/FooterBar';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { getUsuarios } from '../redux/action';
import Swal from "sweetalert2";

const AdminUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  let data = useSelector((state) => state.allusarios);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [modoCreacion, setModoCreacion] = useState(false);
  const [usuarioEditado, setUsuarioEditado] = useState({
    nombre:"",
    correo: "",
    telefono: "",})
   

 
  useEffect(() => {
    dispatch(getUsuarios());
  }, [dispatch]);

  const handleSaveEdit = async (usuarioEditado) => {
    try {
      await axios.put(
        `http://localhost:3001/servicio/${usuarioEditado._id}`,
        usuarioEditado
      );
      dispatch(getUsuarios());
      console.log("Usuario actualizado exitosamente");
      setModoEdicion(false);
    } catch (error) {
      console.error("Error al actualizar el usuario", error);
    }
  };
  const handleEdit = (usuarioId) => {
    setModoEdicion(true);
    const usuario = data.find((usuario) =>usuario._id === usuarioId);
    setUsuarioEditado(usuario);
  };

  const handleDelete = async (id) => {
    console.log("Este es el id" + id);
    console.log("Estoy en el boton delete");
    try {
      await axios.delete(`http://localhost:3001/usuario/${id}`, {
        activo: false,
      });
      dispatch(getUsuarios());
      console.log("Borrado lógico exitoso");
      Swal.fire({
        icon: "success",
        title: "Usuario eliminado con éxito",
        text: "El usuario ha sido eliminado exitosamente.",
      });
    } catch (error) {
      console.error("Error al realizar el borrado lógico", error);
    }
  };
  

  return (
    <div>
      <NavBar />
      <center>
        <h2>Lista de Usuarios</h2>{" "}
      </center>
      <br />
      <div
        className="d-flex align-items-start bg-light mb-12"
        style={{ height: "30px" }}
      >
        <div className="col-1">
          <label>Nombre:</label>
        </div>
        <div className="col-2">
          <input type="text" />
        </div>
        <div className="col-1">
          <label>Descripcion:</label>
        </div>
        <div className="col-1">
          <label>Correo:</label>
        </div>
        <div className="col-1">
          <label>Telefono:</label>
        </div>
        
        <div className="col-1">
          <input type="text" />
        </div>
        <div className="col-2"></div>
        <div className="col-1">
          <button className={style.boton}>Buscar</button>
        </div>
      </div>
      <br />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Correo</th>
            <th>Telefono</th>
            
          </tr>
        </thead>
        <tbody>
          {data.map((atributo, id) => {
            return (
              <tr key={id}>
                <td>{id + 1}</td>
                <td>{atributo.nombre}</td>
                <td className="expand">{atributo.descripcion}</td>
                <td>{atributo.correo}</td>
                <td>{atributo.telefono}</td>
                <td>{atributo.activo === true ? "Activo" : "Desactivo"}</td>
                <td className={style.fit}>
                  <span className={style.actions}>
                    <FontAwesomeIcon
                      className={style.delete_btn}
                      onClick={() => handleDelete(atributo._id)}
                      icon={faTrash}
                    />

                    <FontAwesomeIcon
                      className={style.edit_btn}
                      onClick={() => handleEdit(atributo._id)}
                      icon={faEdit}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {modoEdicion && (
  <ComponenteDeEdicion
    servicio={usuarioEditado}
    handleCancelEdit={() => setModoEdicion(false)}
    onSaveEdit={handleSaveEdit}
  />
)}

{modoCreacion ? (
  <ComponenteDeCreacion handleCancelEdit={() => setModoCreacion(false)} />
) : (
  <div className="btn_crearusuario">
    <button className={style.boton} onClick={() => setModoCreacion(true)}>
      Crear Usuario
    </button>
  </div>
)}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <FooterBar />
    </div>
  );
}

export default AdminUsuario;
