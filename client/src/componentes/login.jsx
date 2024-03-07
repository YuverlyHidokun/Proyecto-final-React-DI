import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import '../assets/css/login.css';

const MySwal = withReactContent(Swal);

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password
      });
  
      if (response.data === 'success') {
        window.location.href = '/index'; // Redireccionar a la página de inicio
      } else {
        MySwal.fire({
          title: <strong>Equivocado!!</strong>,
          html: <i>Usuario o Contraseña Incorrectos!!</i>,
          icon: 'error',
          timer: 3000,
        });
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión. Por favor, intenta de nuevo más tarde.');
    }
  };

  return (
    <div className='body'>
      <div className="container_login">
        <div className="row" style={{ justifyContent: 'center' }}>
          <div>
            <h2 className='h2_login'>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Correo electrónico:</label>
              <input 
                placeholder="Correo electrónico" 
                type="email" 
                id="email" 
                name="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">Contraseña:</label>
              <input 
                placeholder="Contraseña" 
                type="password" 
                id="password" 
                name="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="forgot-password">
                <a href="/Rec_Contraseña">
                  ¿Olvidaste la contraseña?
                </a>
              </div>
              {error && <div className="error-message">{error}</div>}
              <br />
              <div className="actions" style={{ textAlign: 'center', justifyContent: 'space-between'}}>
                <button className="login_iniciar" type="submit">Iniciar Sesión</button>
                <a className="login_crear" href='/crear_cuenta'>Crear Cuenta</a>
                <Link to="/menu" className="btn btn-primary">Menú</Link> {/* Agrega el botón para ir al menú */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
