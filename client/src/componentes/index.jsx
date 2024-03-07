import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/index.css';

function Index() {
  return (
    <div className="container">
      <header className="d-flex flex-column align-items-center py-5">
        <h1 className="display-4 text-center mb-4">¡Bienvenido a nuestra tienda de ropa!</h1>
        <p className="lead text-center">Explora nuestra amplia colección de ropa de moda para hombres y mujeres.</p>
        <Link to="/productos" className="btn btn-primary btn-lg">Ver productos</Link>
      </header>
      <main>
        <div className="row mb-4">
          <div className="col-md-6">
            <img src="https://via.placeholder.com/600x400" className="img-fluid rounded" alt="Ropa de hombre" />
          </div>
          <div className="col-md-6">
            <h2 className="display-5">Ropa de hombre</h2>
            <p className="lead">Descubre nuestra colección de moda masculina. Desde elegantes trajes hasta ropa casual, tenemos todo lo que necesitas para lucir bien.</p>
            <Link to="/productos/hombre" className="btn btn-outline-primary">Ver más</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h2 className="display-5">Ropa de mujer</h2>
            <p className="lead">Encuentra las últimas tendencias en moda femenina. Vestidos, faldas, blusas y más para que te veas fabulosa en cualquier ocasión.</p>
            <Link to="/productos/mujer" className="btn btn-outline-primary">Ver más</Link>
          </div>
          <div className="col-md-6">
            <img src="https://via.placeholder.com/600x400" className="img-fluid rounded" alt="Ropa de mujer" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Index;