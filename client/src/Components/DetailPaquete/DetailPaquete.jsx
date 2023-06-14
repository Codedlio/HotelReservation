import React, { useState, useEffect } from 'react';
import style from "./DetailPaquete.module.css";
import NavBar from '../NavBar/NavBar';
import { useParams } from "react-router-dom";
import FooterBar from '../FooterBar/FooterBar'
import { Link } from "react-router-dom";
import { getPaqueteById } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';


function DetailPaquete() {
  const { id } = useParams();
  let detallePaquete = useSelector((state) => state.paqueteXid);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaqueteById(id));
  }, [dispatch])
  let ArrayImagen = [];
  let urlImage = "";
  const renderPaquetes = () => {
    if (Array.isArray(detallePaquete)) {

      return detallePaquete.map((pack) => {
        ArrayImagen = pack.image;
        if (ArrayImagen) {
          ArrayImagen.map((img) => {
            urlImage = img;
          })
        }
        return (
          <div className={style.container}>
            <img src={urlImage} className={style.Image} alt="puesta-del-sol" ></img>
            <h2 className={style.title} >{pack.nombre}</h2>
            <p>{pack.desc} </p>
            <h4>Costo: {pack.costo}</h4>
            <Link className={style.link} to='/paquetes'>PAQUETES</Link>

          </div>
        );
      });
    }
  };
  return (
    <div className={style.body}>
      <NavBar />
      <div >{renderPaquetes()}</div>
      <FooterBar />
    </div>


  );
}

export default DetailPaquete;
