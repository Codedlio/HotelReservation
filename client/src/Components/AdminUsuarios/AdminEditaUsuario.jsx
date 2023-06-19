import React, { useState, useEffect } from "react";
import { getUsuarios } from "../redux/action";
import { useDispatch } from "react-redux";
import axios from "axios";
import style from "./AdminEditaUsuarios.module.css";
import Swal from "sweetalert2";

const AdminEditaUsuario = ({ usuario, handleCancelEdit, onSaveEdit }) => {
  const dispatch = useDispatch();
  // const servicio = useSelector((state) => state.allservicios);
  const [usuarioEditado, setUsuarioEditado] = useState(usuario);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setUsuarioEditado(usuario);
  }, [usuario]);
  const validateForm = () => {
    const errors = {};

    if (!usuarioEditado.nombre || usuarioEditado.nombre.trim() === "") {
      errors.nombre = "El nombre es requerido";
    }
   if (!usuarioEditado.correo || !/\S+@\S+\.\S+/.test(usuarioEditado.correo)) {
  errors.correo = "El correo es requerido o no es válido";
}
    if (!usuarioEditado.telefono || isNaN(usuarioEditado.correo)) {
        errors.correo = "El telefono es requerido";
      }

    return errors;
  };
  const renderErrors = (errors) => {
    return Object.values(errors).map((error, index) => (
      <div key={index}>{error}</div>
    ));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Swal.fire({
        icon: "error",
        title: "Error de validación",
        html: renderErrors(validationErrors),
      });
      return;
    }
    try {
      await axios.put(
        `http://localhost:3001/servicio/${usuarioEditado._id}`,
        usuarioEditado
      );

      dispatch(getUsuarios());
      console.log("Borrado lógico exitoso");
      Swal.fire({
        icon: "success",
        title: "Usuario actualizado exitosamente",
        text: "Los cambios han sido guardados exitosamente.",
      });
    } catch (error) {
      console.error("Error al actualizar el usuario", error);
    }
  };

  return (
    <div>
      <center>
        <h3>Editar Usuario</h3>
      </center>
      <br />

      <center>
        <form onSubmit={handleSubmit}>
          <div className="col-1">
            <label>Nombre:</label>
          </div>

          <div className="col-2">
            <input
              id="contenedor"
              type="text"
              value={usuarioEditado.nombre}
              onChange={(e) =>
                setUsuarioEditado({
                  ...usuarioEditado,
                  nombre: e.target.value,
                })
              }
            />
          </div>
          <br />
          <div className="col-1">
            <label>Correo:</label>
          </div>
          <div className="col-2">
            <textarea
              cols="50"
              rows="4"
              contentEditable="true"
              type="text"
              value={usuarioEditado.correo}
              onChange={(e) =>
                setUsuarioEditado({
                  ...usuarioEditado,
                 correo: e.target.value,
                })
              }
            />
          </div>
          <div className="col-1">
            <label>Telefono:</label>
          </div>
          <div className="col-2">
            <input
              id="contenedor"
              type="text"
              value={usuarioEditado.telefono}
              onChange={(e) =>
                setUsuarioEditado({
                  ...usuarioEditado,
                  telefono: (e.target.value),
                })
              }
            />
          </div>
          <br />

          <div className="col-1">
            <button
              className={style.boton}
              type="submit"
              onClick={() => onSaveEdit(usuarioEditado)}
            >
              Guardar cambios
            </button>
          </div>
          <br />
          <div className="col-1">
            <button className={style.boton} onClick={handleCancelEdit}>
              Cancelar
            </button>
          </div>
        </form>
      </center>
      <br />
      <br />
      <br />
    </div>
  );
};

export default AdminEditaUsuario;
