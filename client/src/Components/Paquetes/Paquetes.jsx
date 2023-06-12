import React, { useState,useEffect } from 'react';
import style from './Paquetes.module.css';
import NavBar from '../NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { getPaquetes,orderxPaquetes} from '../redux/action';
import { Link } from "react-router-dom";
import FooterBar from '../FooterBar/FooterBar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";


const PaginationPaquetes = () => {  
 //let [data, setData] = useState([]);
 let data = useSelector((state)=> state.allpaquetes);
 data = useSelector((state) => state.orderPaquetes);
 const dispatch = useDispatch(); 

 useEffect(() => {  
   dispatch(getPaquetes());
 },[dispatch])
  //console.log("dataFin");
  //console.log(data);
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  let totalPages = Math.ceil(data.length / itemsPerPage);
  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };

  const handleSortAsc = () => {
    dispatch(orderxPaquetes('asc'));
  };

  const handleCostoAsc = () => {   
    dispatch(orderxPaquetes('costoAsc'));
  };
  
  const handleSortDesc = () => {
    dispatch(orderxPaquetes('desc'));   
  };
  const handleCostoDesc = () => { 
    dispatch(orderxPaquetes('costoDesc'));   
  };

  let  ArrayImagen=[];
  let urlImage="";
  
  const renderPaquetes = () => {
    if (Array.isArray(data)) {  
      
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return data.slice(startIndex, endIndex).map((card) => {
        ArrayImagen=card.image;     
        if(Array.isArray(ArrayImagen)){
          ArrayImagen.map((img)=>{
            urlImage=img;
          })   
        }       
        return (
          <div className={style.cardsContainer} key={card._id}>
            <Link className={style.lin}
           to={`/detail/${card._id}`}>
          <h2 className={style.cardName}>{card.nombre}</h2>
          </Link>
           
            <img src={urlImage} alt={card.nombre} className={style.cardImage}/>  
          
            <p className={style.cardResume}><b >Costo: ${ card.costo} </b> </p>   
                
          </div>
        );
      });
    } 
  };

  const renderPagination = () => {
    const pages = [];
    if(totalPages===0){
      //window.alert("No hay videojuegos con el filtro seleccionado");
      totalPages=1;
    }
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li  key={i}>
          <button 
            href="#"
            onClick={(e) => handleClick(e, i)}
            className={i === currentPage ? style.buttonPagActive : style.buttonDesactivo}
          >
            {i}
          </button>
        </li>
      );
    }
   

    // Agregar flecha hacia la izquierda si no estamos en la primera página
    if (currentPage > 1) {
      pages.unshift(
        <li className={`${style.flecha} ${style.back}`} key="back">
      <button
        href="#"
        onClick={(e) => handleClick(e, currentPage - 1)}
      >
        &lt;
      </button>
    </li>
      );
    }

    // Agregar flecha hacia la derecha si no estamos en la última página
    if (currentPage < totalPages) {
      pages.push(
        <li className={style.flecha} key="next">
          <button
            href="#"
            onClick={(e) => handleClick(e, currentPage + 1)}
            className={style.flecha}
          >
            &gt;
          </button>
        </li>
      );
    }

    return pages;
};

  return (
    <div className={style.body}>
       <div >
       <NavBar></NavBar> 
    
        <div className={style.sortButtonsContainer}> 
        <button className={style.sortAscButton} onClick={handleSortAsc}><FontAwesomeIcon icon={faArrowDown} />  Días</button>
        <button className={style.sortDescButton} onClick={handleSortDesc}> <FontAwesomeIcon icon={faArrowUp} /> Días</button>
        <button className={style.sortAscButton} onClick={handleCostoAsc}>Costo <FontAwesomeIcon icon={faPlus} />  </button>
        <button className={style.sortDescButton} onClick={handleCostoDesc}>Costo <FontAwesomeIcon icon={faMinus} /> </button>
       
      </div>
      <div className={style.cardsPerPage}>{renderPaquetes()}</div>
      <ul className={style.paginationCards}>{renderPagination()}</ul>         
    </div>
    <FooterBar/>
    </div>
  );
};

export default PaginationPaquetes;