import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link } from 'react-router-dom';
import '../assets/css/crear_cuenta.css';

const MySwal = withReactContent(Swal);

function CrearCuenta() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/usuarios/crear', {
        nombre,
        apellido,
        email,
        password
      });

      if (response.data === 'success') {
        MySwal.fire({
          icon: 'success',
          title: '¡Cuenta creada correctamente!',
          text: 'Ahora puedes iniciar sesión con tu nueva cuenta.'
        });
      } else {
        MySwal.fire({
          icon: 'error',
          title: 'Error al crear cuenta',
          text: 'Ocurrió un error al intentar crear la cuenta. Por favor, intenta de nuevo más tarde.'
        });
      }
    } catch (error) {
      console.error('Error al crear cuenta:', error);
      setError('Error al crear cuenta. Por favor, intenta de nuevo más tarde.');
    }
  };

  return (
    <div className='container'>
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='nombre' className='form-label'>Nombre:</label>
          <input type='text' className='form-control' id='nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div className='mb-3'>
          <label htmlFor='apellido' className='form-label'>Apellido:</label>
          <input type='text' className='form-control' id='apellido' value={apellido} onChange={(e) => setApellido(e.target.value)} required />
        </div>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>Correo electrónico:</label>
          <input type='email' className='form-control' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>Contraseña:</label>
          <input type='password' className='form-control' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <div className='text-danger'>{error}</div>}
        <button type='submit' className='btn btn-primary me-2'>Crear Cuenta</button>
        <Link to='/login' className='btn btn-secondary'>Volver al Inicio de Sesión</Link>
      </form>
    </div>
  );
}

export default CrearCuenta;
