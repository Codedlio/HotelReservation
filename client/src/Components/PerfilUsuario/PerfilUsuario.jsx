import React, { useEffect, useState } from 'react';
import style from './PerfilUsuario.module.css';
import {postResena, deleteResena, getUsuariobyEmail} from '../redux/action.js'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validate from './validate';
import {getResenaUsuario,getReservationUsuario } from '../redux/action';
import axios from 'axios';

const PerfilUsuario=()=>{
    const dispatch = useDispatch();
    const { resenaByUsuario, usuarioArray, reserva } = useSelector((state) => state);
    const [data ] = useState(usuarioArray);
    const dataReservacion= Array.isArray(reserva)?reserva:[reserva]
    const resenaArray = Array.isArray(resenaByUsuario) ? resenaByUsuario : [resenaByUsuario];
    
    const [resena, setResena] = useState({
      nombre: "",
      correo: "",
      puntuacion: 0,
      descripcion: "",
    });
    const [error, setError]=useState({
      puntuacion: 0,
      descripcion: "",
    })
  

    const [nombre, setNombre] = useState('');
    const [phone, setPhone] = useState('');
    const [imagen, setImagen] = useState(null);
    const [editing, setEditing] = useState(false);

    const handleNombreChange = (event) => {
    setNombre(event.target.value);
    };

    const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    };

    const handleImagenChange = (event) => {
    setImagen(event.target.files[0]);
    };

    const handleUpUser = (event) => {
      event.preventDefault();

    if (nombre && phone && imagen) {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('telefono', phone);
      formData.append('image', imagen);

      axios.put(`auth/usuario/${data._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        
        console.log(response.data);
        dispatch(getUsuariobyEmail(data.correo))
      })
      .catch(error => {
        
        console.error(error);
      });
    }
    setNombre('');
    setPhone('');
    setImagen(null)
  };
    const handleChange = (event) => {
      setResena({
        ...resena,
        [event.target.name]: event.target.value,
        nombre: data.nombre,
        correo: data.correo,
      });
    setError(validate({...resena, [event.target.name]: event.target.value}));
    };
    
    const handlerDelete = (event) => {
      const id = event.target.value;
      dispatch(deleteResena(id));
      setTimeout(()=>{
        dispatch(getResenaUsuario(data.correo)) }
        , 1000)
    };
    useEffect(() => {
      dispatch(getResenaUsuario(data.correo));
      dispatch(getReservationUsuario(data.correo));

    }, [resenaByUsuario.length, dispatch]);
    
    const handleSubmit = (event) => {
      event.preventDefault();
    
      if(validateResena(dataReservacion)){
        dispatch(postResena(resena));
        setResena({
          nombre: "",
          correo: "",
          puntuacion: 0,
          descripcion: "",
        });
        setTimeout(()=>{
          dispatch(getResenaUsuario(data.correo)) }
          , 1000)
     } else { return alert('No puede realizar comentario');

      }
    };
    const validateResena=(dataReservacion)=> {
      const currentDate = new Date();
      if (!Array.isArray(dataReservacion) || dataReservacion.length===false ) {
        return false; 
      }
      return dataReservacion.some((item) => new Date(item.fechaInicio) <= currentDate);//true 15<14
    }
    const handleEditarClick = () => {
    if(!editing){setEditing(true)
    }else{setEditing(false)};
  };

    console.log(resenaArray);
    console.log(data);
    console.log(dataReservacion);
  return (
    <div className={style.container}>
      <div className={style.usuario}>
        <div>
          <Link className={style.linkContainer} to="/">
          <button className={style.botoncerrar} >
            X
          </button>
          </Link>
        </div>
        <h2>Usuario</h2>
        {!editing && (
          <div>
            {data.image && !data.image.length ? (
            <img src={"https://cdn-icons-png.flaticon.com/128/1077/1077063.png"} />
            ) : (
            <img src={data.image} alt={"imagen"} />
            )}
            <h3>{data.nombre}</h3>
            <h3>{data.correo}</h3>
            <h3>{data.telefono}</h3>
            </div>
            )}

        <div>
        {!editing && (
          <button onClick={handleEditarClick}>Editar</button>
        )}
        {editing && (
          <form onSubmit={handleUpUser}>
            <div> <button onClick={handleEditarClick}>x</button></div>
            <div>
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" value={nombre} onChange={handleNombreChange} />
            </div>
            <div>
              <label htmlFor="correo">Telefono:</label>
              <input type="correo" id="correo" value={data.correo}  />
            </div>
            <div>
              <label htmlFor="phone">Telefono:</label>
              <input type="phone" value={phone} onChange={handlePhoneChange} />
            </div>
            <div>
              <label htmlFor="imagen">Imagen:</label>
              <input type="file" id="imagen" accept="image/jpeg, image/jpg, image/png, image/gif" onChange={handleImagenChange} />
            </div>
            <button type="submit">Enviar</button>
          </form>
        )}
        </div>
      </div>
      <div className={style.resena}>
        <h2>Reserva del usuario:</h2>
          {!Array.isArray(dataReservacion)||dataReservacion.length <= 0? (
          <p>No hay reservacion.</p>
          ) : (
            dataReservacion.map((reserva) => (
              <div key={reserva._id}>
        
        {reserva.habitaciones && (
          <h4>Habitaciones: {reserva.habitaciones.join(", ")}</h4>
        )}
        { reserva.paquete === true && (
          <h4>Paquete: {reserva.paquete.join(", ")}</h4>
        )}
        { reserva.servicios === true && (
          <h4>Servicio:{reserva.servicios}</h4>
        )}
        {reserva.costo && (
          <h4>Costo: USD {reserva.costo}</h4>
        )}
          <h4>Estado: USD {reserva.estado}</h4>
        
        {reserva && reserva.fechaInicio && (
          <h4>Fecha de inicio: {reserva.fechaInicio.substring(0, 10)}</h4>
        )}
        {reserva && reserva.fechaFin && (
          <h4>Fecha de fin: {reserva.fechaFin.substring(0, 10)}</h4>
        )}

      </div>
          ))
        )}
        { resenaArray.length === 0? (<p>No hay comentarios.</p>)
        :(resenaArray.map((item) => (
              <div key={item._id}>
                <h4>⭐️{item.puntuacion}</h4>
                <h4>{item.descripcion}</h4>
                <div> <button onClick={handlerDelete} 
                        value={item._id} name={"id"}>❌</button></div>
              </ div>
          )))}
          
        <div className={style.comentario}>
          <form>
            <h2>Edite un comentario y puntuacion</h2>
            {!validateResena(dataReservacion) &&<p>No se puden dejar comentario y puntuacion, hasta que realice una reservacion y comience su estadia</p>}
            <label>Puntuacion:
              <input type="number" min="0" max="5" step="1" name={"puntuacion"}
              value={resena.puntuacion} onChange={handleChange}placeholder="..."/>
            </label>
            {error.puntuacion && <p>{error.puntuacion}</p>}
            
            <textarea
              id="descripcion"
              value={resena.descripcion}
              onChange={handleChange}
              name={"descripcion"}
              placeholder="Escribe..."
              required
            ></textarea>
                {error.descripcion && <p>{error.descripcion}</p>}
            <button onClick={handleSubmit}>Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;