import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Empleados from './componentes/empleados';
import Login from './componentes/login';
import Crear_cuenta from './componentes/crear_cuenta';
import Index from './componentes/index';
import Menu from './componentes/menu';
import Usuarios from './componentes/clientes';
import Productos from './componentes/productos';


function App() {
  return (
    <Router>
      <div>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/crear_cuenta" element={<Crear_cuenta />} />
          <Route path="/index" element={<Index />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/clientes" element={<Usuarios />} />
          <Route path="/productos" element={<Productos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;