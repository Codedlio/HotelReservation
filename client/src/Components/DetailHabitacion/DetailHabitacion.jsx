import React, { useState,useEffect } from 'react';
import style from "./DetailHabitacion.module.css";
import NavBar from '../NavBar/NavBar';
import { useParams } from "react-router-dom";
import FooterBar from '../FooterBar/FooterBar'
import { Link} from "react-router-dom";
import {getHabitacionById} from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from "react-bootstrap/Carousel";


function DetailHabitacion() {
  const { id } = useParams();   
 let detalleHabitacion = useSelector((state)=> state.habitacionXid);
 const [index, setIndex] = useState(0);
 console.log("detalleHabitacion");
 console.log(detalleHabitacion);
 const dispatch = useDispatch(); 

 useEffect(() => {  
   dispatch(getHabitacionById(id));
 },[dispatch])
  let  ArrayImagen=[];
  let urlImage="";
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const renderPaquetes = () => {
    if (Array.isArray(detalleHabitacion)) {  
      console.log("array-detalleHabitacion");
      return detalleHabitacion.map((pack) => {
        ArrayImagen=pack.image;     
        if(ArrayImagen){
          ArrayImagen.map((img)=>{
            urlImage=img;
          })   
        }       
        return (
          <div className={style.container}>  
        <img src={urlImage} className={style.Image}  alt="puesta-del-sol" ></img> 
        <h2 className={style.title} >{pack.nombre}</h2>  
        <p>{pack.descripcion} </p>
        <h4>Costo: {pack.precio}</h4>        
        {/* <Link className={style.link} to='/paquetes'>PAQUETES</Link>         */}
    
        <div className="container w-100">
        {pack.image.length && <Carousel onSelect={handleSelect}>
          {pack.image.map(imagen => {
            return (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={imagen}
                alt="Slide"
                width="100%"
                height="750px"
              />
              <Carousel.Caption>
                {/* <h3>Second slide label</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
              </Carousel.Caption> 
            </Carousel.Item> 
            )
          })}
        </Carousel>}
      </div>
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

export default DetailHabitacion;
