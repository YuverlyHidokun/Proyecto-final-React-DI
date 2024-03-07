import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaUserFriends, FaShoppingBag, FaSignInAlt } from 'react-icons/fa'; // Importar íconos de Font Awesome
import '../assets/css/menu.css';

function Menu() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">Menú</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <div className="module">
                  <Link to="/empleados" className="nav-link">
                    <FaUser className="module-icon" />
                    <span>Empleados</span>
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <div className="module">
                  <Link to="/clientes" className="nav-link">
                    <FaUserFriends className="module-icon" />
                    <span>Clientes</span>
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <div className="module">
                  <Link to="/productos" className="nav-link">
                    <FaShoppingBag className="module-icon" />
                    <span>Productos</span>
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <div className="module">
                  <Link to="/" className="nav-link">
                    <FaSignInAlt className="module-icon" />
                    <span>Volver al Login</span>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Menu;
