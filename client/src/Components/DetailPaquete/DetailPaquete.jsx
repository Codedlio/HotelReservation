import React from "react";
import style from "./DetailPaquete.module.css";
import NavBar from '../NavBar/NavBar';
import Imagen from "./img/filosofia.jpg";
import { useParams } from "react-router-dom";
import { useState} from "react";
import FooterBar from '../FooterBar/FooterBar'

function DetailPaquete() {
  const { id } = useParams();
  console.log("id");
  console.log(id);
  let [data, setData] = useState([]);
    data=[];
   data.push( {id:1,nombre: "3 días y 2 noches",costo: 370,desc:"Este viaje te permite conocer los atractivos más importantes de la montaña. Encontrarás experiencias de naturaleza, comunidades y termalismo. También incluimos actividades de bienestar en nuestro hotel y podrás hacer uso de todas sus instalaciones.",costo: 370,url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsmRzEtfDWHdrLHvOli1zL5yqnEOAYbcZ-MFd8IJHJF6kXLT5xLZaJcTUh39YIe5Yrp90&usqp=CAU"});
   data.push( {id:2,nombre: "4 días y 3 noches",costo: 380,desc:"Este viaje te permite conocer los atractivos más importantes de la montaña y descubrir lugares poco visitados, pero de gran importancia. Incluyen experiencias en lagunas, comunidades, pueblos de artesanos y termalismo. Al final del día disfrutarás de las actividades de bienestar que ofrece nuestro hotel boutique y podrás hacer uso de todas sus instalaciones.",costo: 380,url:"https://media-magazine.trivago.com/wp-content/uploads/sites/3/2016/09/12162624/hoteles-naturaleza-ladera-resort-santa-luc%C3%ADa-vistas.jpg"});
   data.push( {id:3,nombre: "5 días y 4 noches",costo: 400,desc:"Este viaje te permite conocer la montaña a profundidad, recargarte con las actividades de bienestar que ofrecemos y disfrutar de las instalaciones que tenemos en nuestro hotel. Visitaremos comunidades, lagunas, baños termales y glaciares.Haremos caminatas por alguno de los lugares más bellos del lugar.",costo: 400,url:"https://cdn.mexicodestinos.com/hoteles/generations-riviera-maya-alberca-min.jpg"});
   data.push( {id:4,nombre: "6 días y 5 noches",costo: 450,desc:"Este viaje te permite conocer la montaña a profundidad,te brindamos una sesión de fotos, recargarte con las actividades de bienestar que ofrecemos y disfrutar de las instalaciones que tenemos en nuestro hotel. Visitaremos comunidades, lagunas, baños termales y glaciares.Haremos caminatas por alguno de los lugares más bellos del lugar.",costo: 450,url:"https://trippingsv.files.wordpress.com/2019/02/ranch_at_rock_creek_.jpg"});
   data.push( {id:5,nombre: "3 días y 2 noches",costo: 370,desc:"Este viaje te permite conocer los atractivos más importantes de la montaña. Encontrarás experiencias de naturaleza, comunidades y termalismo. También incluimos actividades de bienestar en nuestro hotel y podrás hacer uso de todas sus instalaciones.",costo: 370,url:"http://elbalcondelavera.com/wp-content/uploads/008.jpg"});
   data.push( {id:6,nombre: "4 días y 3 noches",costo: 380,desc:"Este viaje te permite conocer los atractivos más importantes de la montaña y descubrir lugares poco visitados, pero de gran importancia. Incluyen experiencias en lagunas, comunidades, pueblos de artesanos y termalismo. Al final del día disfrutarás de las actividades de bienestar que ofrece nuestro hotel boutique y podrás hacer uso de todas sus instalaciones.",costo: 380,url:"http://elbalcondelavera.com/wp-content/uploads/008.jpg"});
   data.push( {id:7,nombre: "5 días y 4 noches",costo: 400,desc:"Este viaje te permite conocer la montaña a profundidad, recargarte con las actividades de bienestar que ofrecemos y disfrutar de las instalaciones que tenemos en nuestro hotel. Visitaremos comunidades, lagunas, baños termales y glaciares.Haremos caminatas por alguno de los lugares más bellos del lugar.",costo: 400,url:"https://cdn.mexicodestinos.com/hoteles/generations-riviera-maya-alberca-min.jpg"});
   data.push( {id:8,nombre: "6 días y 5 noches",costo: 450,desc:"Este viaje te permite conocer la montaña a profundidad,te brindamos una sesión de fotos, recargarte con las actividades de bienestar que ofrecemos y disfrutar de las instalaciones que tenemos en nuestro hotel. Visitaremos comunidades, lagunas, baños termales y glaciares.Haremos caminatas por alguno de los lugares más bellos del lugar.",costo: 380,url:"https://www.shutterstock.com/image-photo/rear-view-young-woman-having-260nw-1896247567.jpg"});
   
   
   var detallePaquete=[];//data.filter(game=>game.id===id );
   data.forEach((vg) => {
    if(vg.id==id){
      console.log("0k");
      detallePaquete.push(vg);
    }});

    console.log("detallePaquete");
    console.log(detallePaquete);
  //  data.push( {id:7,nombre: "3 días y 2 noches",desc:"",costo: 400,url:"https://static.designboom.com/wp-content/uploads/2019/08/eagle-rock-cliffs-pingjiang-homey-wild-luxury-hotel-china-designboom-02.jpg"});
  //  data.push( {id:8,nombre: "4 días y 3 noches",desc:"",costo: 450,url:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/d4/7b/c3/habitacion-clasica-con.jpg?w=700&h=-1&s=1"});
  const renderPaquetes = () => {
    if (Array.isArray(detallePaquete)) {  
         
      return detallePaquete.map((pack) => {
        // console.log("card");
        // console.log(card);

        return (
          <div className={style.container}>  
        <img src={pack.url} className={style.Image}  alt="puesta-del-sol" ></img> 
        <h2 className={style.title} >{pack.nombre}</h2>  
         
        <div className={style.centerleft}></div>  
        <p>{pack.desc} </p>

        <h2>Costo: {pack.costo}</h2> 
      </div>
        );
      });
    } else {
      // Handle the case where data is not an array
      
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
