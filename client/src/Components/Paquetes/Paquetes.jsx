import React, { useState } from 'react';
import style from './Paquetes.module.css';
import { Link } from 'react-router-dom';
import Image1 from '../Paquetes/img/habi_1.png';
import Image2 from '../Paquetes/img/habi_2.png';
import Image3 from '../Paquetes/img/habi_3_yacusi.png';
import Image4 from '../Paquetes/img/habi_4_mirador.png';




function Paquetes() {
  
  return (
    
    <div className={style.cardsContainer}>
     {/* <Link
        to="/"
        className={style.Nav_link}>
        🏡HOME
    </Link> */}
     <img src={Image1} className={style.cardImage}  alt="videogames" ></img> 
     <img src={Image2} className={style.cardImage}  alt="videogames" ></img> 
     <img src={Image3} className={style.cardImage} alt="videogames" ></img> 
     <img src={Image4} className={style.cardImage} alt="videogames" ></img> 
    </div>
  );
}

export default Paquetes;
