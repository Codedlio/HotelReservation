import React, { useState,useEffect } from 'react';
import style from './Paquetes.module.css';
import { Link } from 'react-router-dom';
import Image1 from '../Paquetes/img/habi_1.png';
import Image2 from '../Paquetes/img/habi_2.png';
import Image3 from '../Paquetes/img/habi_3_yacusi.png';
import Image4 from '../Paquetes/img/habi_4_mirador.png';
import NavBar from '../NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { getPaquetes} from '../redux/action';

function Paquetes() {
  
  let data = useSelector((state)=> state.allpaquetes);
  console.log("data.allpaquetes");
  console.log(data);
  const dispatch = useDispatch(); 

  useEffect(() => {  
    dispatch(getPaquetes());
  },[dispatch])


  return (  
      <div className={style.contenedor}>
      <NavBar />    
      
      <div className={style.cardsContainer}>
        <img src={Image1} className={style.cardImage}  alt="paquete1" ></img> 
        <img src={Image2} className={style.cardImage}  alt="paquete2" ></img> 
        <img src={Image3} className={style.cardImage} alt="paquete3" ></img> 
        <img src={Image4} className={style.cardImage} alt="paquete4" ></img> 
      </div>
    </div>
  );
}

export default Paquetes;
