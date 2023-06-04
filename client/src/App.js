import './App.css';
import Home from './Components/Home/Home.jsx';
import {  Route, Routes } from 'react-router-dom';
import Habitacion1 from './Components/Habitaciones/Habitacion1/Habitacion1.jsx';
import Habitacion2 from './Components/Habitaciones/Habitacion2/Habitacion2.jsx';
import Habitacion3 from './Components/Habitaciones/Habitacion3/Habitacion3.jsx'
import Habitacion4 from './Components/Habitaciones/Habitacion4/Habitacion4.jsx'
import Habitacion5 from './Components/Habitaciones/Habitacion5/Habitacion5.jsx'

import VillaArce from './Components/Habitaciones/Habitacion6/VillaArce.jsx'
import VillaTilo from './Components/Habitaciones/Habitacion7/VillaTilo.jsx' 
import VillaCedra from './Components/Habitaciones/Habitacion8/VillaCedra';
import VillaMadrid from './Components/Habitaciones/Habitacion9/VillaMadrid';
import Reserva from './Components/Reserva/Reserva';
import Paquetes from './Components/Paquetes/Paquetes';
import Contacto from './Components/Contacto/Contacto';
import Login from './Components/Login/Login';
import ContenedorLogin from './Components/ContenedorLogin/ContenedorLogin';
import Login2 from './Components/Login2/Login2'
import Trekking from './Components/Servicios/Trekking/Trekking';
import Piscinatermal from './Components/Servicios/Piscinatermal/Piscinatermal';

function App() {
  return (
    <div className="App">

        <Routes>
          <Route path="/habitacion1" element={<Habitacion1 />} />
          <Route path="/habitacion2" element={<Habitacion2 />} />
          <Route path="/habitacion3" element={<Habitacion3 />} />
          <Route path="/habitacion4" element={<Habitacion4 />} />
          <Route path="/habitacion5" element={<Habitacion5 />} />
          <Route path="/habitacion6" element={<VillaArce />} />
          <Route path="/habitacion7" element={<VillaTilo />} />
          <Route path="/habitacion8" element={<VillaCedra />} />
          <Route path="/habitacion9" element={<VillaMadrid />} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/paquetes" element={<Paquetes/>} />
          <Route path="/contacto" element={<Contacto/>} />
          <Route path="/contenedor" element={<ContenedorLogin/>} />
          <Route path="/registrarse" element={<Login/>} />
          <Route path="/ingresar" element={<Login2/>} />
          <Route path="/piscina" element={<Piscinatermal/>} />
          <Route path="/trekking" element={ <Trekking/>} />
          

          <Route path="/" element={<Home />} />
        </Routes>
       
    
    </div>
  );
}

export default App;

