import React, { useState, useEffect } from 'react';
import style from "./AdminPaquetes.module.css";
import NavBar from '../NavBar/NavBar';
import FooterBar from '../FooterBar/FooterBar';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getPaquetes } from '../redux/action';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faEdit} from "@fortawesome/free-solid-svg-icons";


const AdminPaquetes= () => {
  let data = useSelector((state) => state.allpaquetes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPaquetes());
  }, [dispatch])
  return (
    <div>
       <NavBar />   
       <center><h2>Lista de paquetes</h2>  </center>
       <br />
      <div className="d-flex align-items-start bg-light mb-12" style={{ height: "30px" }}>
        
        <div className='col-1'>
        <label>Nombre:</label>
        </div>
        <div className='col-2'>
        <input type="text" />
        </div>
        <div className='col-1'>
        <label>Descripción:</label>
        </div>
        <div className='col-2'>
        <input type="text" />
        </div>
        <div className='col-1'>
          <label>Costo:</label>        
        </div>
        <div className='col-1'>
          <input type="text" />
        </div>
        <div className='col-2'>
          
        </div>
        <div className='col-1'>
          <button className={style.boton}>Buscar</button>      
        </div>
        <div className='col-1'>
          <button className={style.boton}>Nuevo Paquete</button>      
        </div>
      </div>
      <br />
      <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Costo</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
          {data.map((row, idx) => {
            // const statusText =
            //   row.status.charAt(0).toUpperCase() + row.status.slice(1);

            return (
              <tr key={idx}>
                <td>{idx+1}</td>
                <td>{row.nombre}</td>
                <td className="expand">{row.desc}</td>
                <td>{row.costo}</td>
                <td>{row.activo===true?'Activo':'Desactivo'}</td>
                <td className={style.fit}>
                  <span  className={style.actions}>
                  <FontAwesomeIcon className={style.delete_btn} 
                       // onClick={() => deleteRow(idx)}
                      icon={faTrash} />
                  {/* <button 
                  // onClick={() => deleteRow(idx)}
                  >
                      
                  </button>   */}
                  <FontAwesomeIcon className={style.edit_btn} 
                  // onClick={() => deleteRow(idx)}
                      icon={faEdit} />               
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
    </Table>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <FooterBar/>
    </div> 
  );
}
export default AdminPaquetes;