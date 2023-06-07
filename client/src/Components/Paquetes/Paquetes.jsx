import React, { useState,useEffect } from 'react';
import style from './Paquetes.module.css';
import NavBar from '../NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { getPaquetes} from '../redux/action';
import { Link } from "react-router-dom";
import FooterBar from '../FooterBar/FooterBar'

const PaginationPaquetes = () => {  
 let [data, setData] = useState([]);
 const [sortRatingOrder, setRatingOrder] = useState('ratingAsc');
  // let data = useSelector((state)=> state.allVideogames);
 console.log("hiii");
  // data = useSelector((state) => state.orderGames);
  data=[];
  data.push( {id:1,nombre: "3 días y 2 noches",costo: 370,url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsmRzEtfDWHdrLHvOli1zL5yqnEOAYbcZ-MFd8IJHJF6kXLT5xLZaJcTUh39YIe5Yrp90&usqp=CAU"});
  data.push( {id:2,nombre: "4 días y 3 noches",costo: 380,url:"https://media-magazine.trivago.com/wp-content/uploads/sites/3/2016/09/12162624/hoteles-naturaleza-ladera-resort-santa-luc%C3%ADa-vistas.jpg"});
  data.push( {id:3,nombre: "5 días y 4 noches",costo: 400,url:"https://cdn.mexicodestinos.com/hoteles/generations-riviera-maya-alberca-min.jpg"});
  data.push( {id:4,nombre: "6 días y 5 noches",costo: 450,url:"https://trippingsv.files.wordpress.com/2019/02/ranch_at_rock_creek_.jpg"});
  data.push( {id:5,nombre: "3 días y 2 noches",costo: 370,url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcjlPMjVgJFpG-v2B0vLVvBWGGHWi5Mp3ijw&usqp=CAU"});
  data.push( {id:6,nombre: "4 días y 3 noches",costo: 380,url:"https://www.shutterstock.com/image-photo/rear-view-young-woman-having-260nw-1896247567.jpg"});
  data.push( {id:7,nombre: "5 días y 4 noches",costo: 400,url:"https://static.designboom.com/wp-content/uploads/2019/08/eagle-rock-cliffs-pingjiang-homey-wild-luxury-hotel-china-designboom-02.jpg"});
  data.push( {id:8,nombre: "6 días y 5 noches",costo: 450,url:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/d4/7b/c3/habitacion-clasica-con.jpg?w=700&h=-1&s=1"});

  // console.log("data");
  // console.log(data);


  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  let totalPages = Math.ceil(data.length / itemsPerPage);
  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };

  const handleSortAsc = () => {
    //setSortOrder('asc');
    //setData([...data].sort((a, b) => a.name.localeCompare(b.name)));    
    //dispatch(orderxGames('asc'));
  };

  const handleRatingAsc = () => {
    //setRatingOrder('ratingAsc');
   setData([...data].sort((a, b) => a.costo-b.costo));


    //dispatch(orderxGames('ratingAsc'));
  };
  
  const handleSortDesc = () => {
    //setSortOrder('desc');
    //dispatch(orderxGames('desc'));
    //setData([...data].sort((a, b) => b.name.localeCompare(a.name)));
  };
  const handleRatingDesc = () => {
    //dispatch(orderxGames('ratingDesc'));
    setData([...data].sort((a, b) => b.costo-a.costo));
  

  };


  
  const renderPaquetes = () => {
    if (Array.isArray(data)) {  
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return data.slice(startIndex, endIndex).map((card) => {
        return (
          <div className={style.cardsContainer} key={card.id}>
            <Link
           to={`/detail/${card.id}`}>
          <h2 className={style.cardName}>{card.nombre}</h2>
          </Link>
            <img src={card.url} alt={card.nombre} className={style.cardImage}/>            
               
            <p className={style.cardResume}><b>Costo:</b> {card.costo}</p>           
          </div>
        );
      });
    } else {
      // Handle the case where data is not an array
      
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
        <li key={i}>
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
        <li key="back">
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
        <li key="next">
          <button
            href="#"
            onClick={(e) => handleClick(e, currentPage + 1)}
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
        <button className={style.sortAscButton} onClick={handleSortAsc}>A - Z</button>
        <button className={style.sortDescButton} onClick={handleSortDesc}>Z - A</button>
        <button className={style.sortAscButton} onClick={handleRatingAsc}>Costo ⬆️ </button>
        <button className={style.sortDescButton} onClick={handleRatingDesc}>Costo ⬇️ </button>
       
      </div>
      <div className={style.cardsPerPage}>{renderPaquetes()}</div>
      <ul className={style.paginationCards}>{renderPagination()}</ul>         
    </div>
    <FooterBar/>
    </div>
  );
};

export default PaginationPaquetes;





