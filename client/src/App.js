import './App.css';
import Home from './Components/Home/Home.jsx';
import {  Route, Routes } from 'react-router-dom';
import Habitacion1 from './Components/Habitaciones/Habitacion1/Habitacion1.jsx';
import Habitacion2 from './Components/Habitaciones/Habitacion2/Habitacion2.jsx';
import Habitacion3 from './Components/Habitaciones/Habitacion3/Habitacion3.jsx'
import Habitacion4 from './Components/Habitaciones/Habitacion4/Habitacion4.jsx'
import Habitacion5 from './Components/Habitaciones/Habitacion5/Habitacion5.jsx'
import Reserva from './Components/Reserva/Reserva';
import Paquetes from './Components/Paquetes/Paquetes';
import Contacto from './Components/Contacto/Contacto';
import Login from './Components/Login/Login';

function App() {
  return (
    <div className="App">

        <Routes>
          <Route path="/habitacion1" element={<Habitacion1 />} />
          <Route path="/habitacion2" element={<Habitacion2 />} />
          <Route path="/habitacion3" element={<Habitacion3 />} />
          <Route path="/habitacion4" element={<Habitacion4 />} />
          <Route path="/habitacion5" element={<Habitacion5 />} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/paquetes" element={<Paquetes/>} />
          <Route path="/contacto" element={<Contacto/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Home />} />
        </Routes>
       
    
    </div>
  );
}

export default App;

