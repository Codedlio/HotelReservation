import './App.css';
import Home from './Components/Home/Home.jsx';
import {  Route, Routes } from 'react-router-dom';
import Habitacion1 from './Components/Habitaciones/Habitacion1/Habitacion1.jsx';

function App() {
  return (
    <div className="App">

        <Routes>
          <Route path="/habitacion1" element={<Habitacion1 />} />
          
          <Route path="/" element={<Home />} />
        </Routes>
        {/* < Home/> */}
    
    </div>
  );
}

export default App;

