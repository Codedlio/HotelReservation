import React from "react";
import style from "./IndicadorReservas.module.css";
import NavBar from '../NavBar/NavBar';
import FooterBar from '../FooterBar/FooterBar'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PaymentStatusChart from "./PaymentStatusChart";
import ReservationCount from "./ReservationCount";
//import roomData from "../../../src/reservacions.json";
function IndicadorReservas() {
//   const servicios = data.servicios.map(servicio => servicio);
// const paquetes = data.paquetes.map(paquete => paquete);

  const roomData=[ { roomType: 'Individual', revenue: 1200 },
  { roomType: 'Doble', revenue: 2500 },
  { roomType: 'Suite', revenue: 4000 },]
  //const data =roomData.map(room=>room.precio)
  return (

    <div className={style.body}>
    <NavBar />   

    <div className={style.container}>         
      <h2>Indicador de Reservas</h2>  
      <div className={style.centerleft}></div>  
      <PaymentStatusChart/>
      <ReservationCount/>
      <p></p><BarChart width={600} height={300} data={roomData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="roomType" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="revenue" fill="#8884d8" />
    </BarChart>
    </div>
    <FooterBar/>
</div>
    

    
 
  );
}

export default IndicadorReservas;
