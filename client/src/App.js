import './App.css';
import Home from './Components/Home/Home.jsx';
// import { BrowserRouter as Route, Routes } from 'react-router-dom';
// import Habitacion1 from './Components/Habitaciones/Habitacion1/Habitacion1.jsx';

function App() {
  return (
    <div className="App">

        {/* <Routes>
          <Route path="/habitacion1" element={<Habitacion1 />} />
          <Route path="/habitacion2" element={<Habitacion2 />} />
          <Route path="/habitacion3" element={<Habitacion3 />} />
          <Route path="/habitacion4" element={<Habitacion4 />} />
          <Route path="/habitacion5" element={<Habitacion5 />} />
          <Route path="/" element={<Home />} />
        </Routes> */}
        < Home/>
    
    </div>
  );
}

export default App;

