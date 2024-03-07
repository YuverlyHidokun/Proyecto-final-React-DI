import { useState, useEffect } from 'react';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../assets/css/empleados.css';

function Empleados() {

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [id, setIdEmpleado] = useState("");

  const [editar, setEditar] = useState(false);

  const [empleadosList, setEmpleados] = useState([]);

  const MySwal = withReactContent(Swal);

  const addEmpleado = () => {
    Axios.post("http://localhost:3001/Empleados", {
      nombre: nombre,
      apellido: apellido,
      email: email,
      telefono:telefono,
      direccion: direccion
    }).then(() => {
      getEmpleados();
      MySwal.fire({
        icon: 'success',
        title: '¡Empleado registrado correctamente!',
      });
    });
  }

    const updateEmpleado = () => {
        Axios.put(`http://localhost:3001/update/${id}`, {
            Nombre: nombre,
            Apellido: apellido,
            Email: email,
            Telefono: telefono,
            Direccion: direccion
        }).then(() => {
            getEmpleados();
            MySwal.fire({
                icon: 'success',
                title: '¡Empleado actualizado correctamente!',
            });
        }).catch(error => {
            console.error('Error al actualizar empleado:', error);
            MySwal.fire({
                icon: 'error',
                title: '¡Error al actualizar empleado!',
                text: 'Ocurrió un error al intentar actualizar el empleado. Por favor, inténtalo de nuevo más tarde.',
            });
        });
    }

  const editarEmpleado = (val) => {
    setEditar(true);
  
    setIdEmpleado(val.ID_Empleado);
    setNombre(val.Nombre);
    setApellido(val.Apellido);
    setEmail(val.Email);
    setTelefono(val.Telefono);
    setDireccion(val.Direccion);
  }

  const deleteEmpleado = (id) => {
    Axios.delete(`http://localhost:3001/Empleados/${id}`)
      .then(() => {
        setEditar(false);
        getEmpleados();
        MySwal.fire({
          icon: 'success',
          title: '¡Empleado eliminado correctamente!',
        });
      })
      .catch((error) => {
        console.error('Error al eliminar empleado:', error);
      });
  };
  

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/Empleados").then((response) => {
      setEmpleados(response.data);
    });
  }

  useEffect(() => {
    getEmpleados();
  }, []);

  return (
    <div className="container">

      <div className="card text-center">
        <div className="card-header">
          GESTIÓN DE EMPLEADOS
        </div>
        <div className="card-body">
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre: </span>
            <input type="text" value={nombre}
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control" placeholder="Ingrese un nombre" aria-label="Nombre" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Apellido: </span>
            <input type="text" value={apellido}
              onChange={(event) => {
                setApellido(event.target.value);
              }}
              className="form-control" placeholder="Ingrese una Apellido" aria-label="Apellido" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Email: </span>
            <input type="email" value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              className="form-control" placeholder="Ingrese un Email" aria-label="Email" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Telefono: </span>
            <input type="text" value={telefono}
              onChange={(event) => {
                setTelefono(event.target.value);
              }}
              className="form-control" placeholder="Ingrese un Telefono" aria-label="Telefono" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Direccion: </span>
            <input type="text" value={direccion}
              onChange={(event) => {
                setDireccion(event.target.value);
              }}
              className="form-control" placeholder="Direccion" aria-label="Direccion" aria-describedby="basic-addon1" />
          </div>
        </div>
        <div className="card-footer text-muted">
           {
                editar ?
                <div>
                    <button className='btn btn-warning m-2' onClick={updateEmpleado}>Actualizar</button>
                    <button className='btn btn-info m-2' onClick={() => setEditar(false)}>Cancelar</button>
                </div>
                :
                <button className='btn btn-success' onClick={addEmpleado}>Registrar</button>
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
            <th scope="col">Telefono</th>
            <th scope="col">Direccion</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            empleadosList.map((val, key) => {
              return <tr key={val.ID_Empleado}>
                <th scope="row">{val.ID_Empleado}</th>
                <td>{val.Nombre}</td>
                <td>{val.Apellido}</td>
                <td>{val.Email}</td>
                <td>{val.Telefono}</td>
                <td>{val.Direccion}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" onClick={() => editarEmpleado(val)} className="btn btn-info">Editar</button>
                    <button type="button" onClick={() => deleteEmpleado(val.ID_Empleado)} className="btn btn-danger">Eliminar</button>
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

export default Empleados;
