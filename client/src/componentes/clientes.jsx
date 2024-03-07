import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../assets/css/clientes.css';

function Usuarios() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [id, setIdUsuario] = useState("");
    const [editar, setEditar] = useState(false);
    const [usuariosList, setUsuarios] = useState([]);
    const MySwal = withReactContent(Swal);

    const addUsuario = () => {
        Axios.post("http://localhost:3001/Usuarios", {
          nombre: nombre,
          apellido: apellido,
          email: email,
          telefono: telefono,
          direccion: direccion,
          contraseña: contraseña
        }).then(() => {
          getUsuarios();
          MySwal.fire({
            icon: 'success',
            title: '¡Usuario registrado correctamente!',
          });
        }).catch(error => {
          console.error('Error al agregar usuario:', error);
          MySwal.fire({
            icon: 'error',
            title: '¡Error al registrar usuario!',
            text: 'Ocurrió un error al intentar registrar el usuario. Por favor, inténtalo de nuevo más tarde.',
          });
        });
      }
    
      const updateUsuario = () => {
        Axios.put(`http://localhost:3001/updateUsuario/${id}`, {
          nombre: nombre,
          apellido: apellido,
          email: email,
          telefono: telefono,
          direccion: direccion
        }).then(() => {
          getUsuarios();
          MySwal.fire({
            icon: 'success',
            title: '¡Usuario actualizado correctamente!',
          });
        }).catch(error => {
          console.error('Error al actualizar usuario:', error);
          MySwal.fire({
            icon: 'error',
            title: '¡Error al actualizar usuario!',
            text: 'Ocurrió un error al intentar actualizar el usuario. Por favor, inténtalo de nuevo más tarde.',
          });
        });
      }
    
      const editarUsuario = (val) => {
        setEditar(true);
        setIdUsuario(val.ID_Usuario);
        setNombre(val.Nombre);
        setApellido(val.Apellido);
        setEmail(val.Email);
        setTelefono(val.Telefono);
        setDireccion(val.Direccion);
      }
    
      const deleteUsuario = (id) => {
        Axios.delete(`http://localhost:3001/Usuarios/${id}`)
          .then(() => {
            setEditar(false);
            getUsuarios();
            MySwal.fire({
              icon: 'success',
              title: '¡Usuario eliminado correctamente!',
            });
          })
          .catch((error) => {
            console.error('Error al eliminar usuario:', error);
            MySwal.fire({
              icon: 'error',
              title: '¡Error al eliminar usuario!',
              text: 'Ocurrió un error al intentar eliminar el usuario. Por favor, inténtalo de nuevo más tarde.',
            });
          });
      };
    
      const getUsuarios = () => {
        Axios.get("http://localhost:3001/Usuarios").then((response) => {
          setUsuarios(response.data);
        });
      }
    
      useEffect(() => {
        getUsuarios();
      }, []);
    
      return (
        <div className="container">
          <div className="card text-center">
            <div className="card-header">
              GESTIÓN DE USUARIOS
            </div>
            <div className="card-body">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Nombre: </span>
                <input type="text" value={nombre}
                  onChange={(event) => { setNombre(event.target.value); }}
                  className="form-control" placeholder="Ingrese un nombre" aria-label="Nombre" aria-describedby="basic-addon1" />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Apellido: </span>
                <input type="text" value={apellido}
                  onChange={(event) => { setApellido(event.target.value); }}
                  className="form-control" placeholder="Ingrese un apellido" aria-label="Apellido" aria-describedby="basic-addon1" />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Email: </span>
                <input type="email" value={email}
                  onChange={(event) => { setEmail(event.target.value); }}
                  className="form-control" placeholder="Ingrese un correo electrónico" aria-label="Email" aria-describedby="basic-addon1" />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Teléfono: </span>
                <input type="text" value={telefono}
                  onChange={(event) => { setTelefono(event.target.value); }}
                  className="form-control" placeholder="Ingrese un teléfono" aria-label="Teléfono" aria-describedby="basic-addon1" />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Dirección: </span>
                <input type="text" value={direccion}
                  onChange={(event) => { setDireccion(event.target.value); }}
                  className="form-control" placeholder="Ingrese una dirección" aria-label="Dirección" aria-describedby="basic-addon1" />
              </div>
              {!editar ?
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Contraseña: </span>
                  <input type="password" value={contraseña}
                    onChange={(event) => { setContraseña(event.target.value); }}
                    className="form-control" placeholder="Ingrese una contraseña" aria-label="Contraseña" aria-describedby="basic-addon1" />
                </div>
                : null
              }
            </div>
            <div className="card-footer text-muted">
              {
                editar ?
                  <div>
                    <button className='btn btn-warning m-2' onClick={updateUsuario}>Actualizar</button>
                    <button className='btn btn-info m-2' onClick={() => setEditar(false)}>Cancelar</button>
                  </div>
                  :
                  <button className='btn btn-success' onClick={addUsuario}>Registrar</button>
              }
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Email</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Dirección</th>
                <th scope="col">Contraseña</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                usuariosList.map((val, key) => {
                  return <tr key={val.ID_Usuario}>
                    <th scope="row">{val.ID_Usuario}</th>
                    <td>{val.Nombre}</td>
                    <td>{val.Apellido}</td>
                    <td>{val.Email}</td>
                    <td>{val.Telefono}</td>
                    <td>{val.Direccion}</td>
                    <td>{val.Contraseña}</td>
                    <td>
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" onClick={() => editarUsuario(val)} className="btn btn-info">Editar</button>
                        <button type="button" onClick={() => deleteUsuario(val.ID_Usuario)} className="btn btn-danger">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      );
}

export default Usuarios;
