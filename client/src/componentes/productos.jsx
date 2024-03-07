import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../assets/css/productos.css';

function Productos() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [talla, setTalla] = useState('');
  const [color, setColor] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [editar, setEditar] = useState(false);
  const [idProducto, setIdProducto] = useState('');
  const [productosList, setProductos] = useState([]);
  const [empleadosList, setEmpleados] = useState([]);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    getProductos();
    getEmpleados();
  }, []);

  const getProductos = () => {
    Axios.get('http://localhost:3001/productos').then((response) => {
      setProductos(response.data);
    });
  };

  const addProducto = () => {
    Axios.post('http://localhost:3001/productos', {
      nombre,
      descripcion,
      precio,
      cantidad,
      talla,
      color,
      proveedor,
    }).then(() => {
      getProductos();
      MySwal.fire({
        icon: 'success',
        title: '¡Producto registrado correctamente!',
      });
    });
  };

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
        setEmpleados(response.data);
    }).catch(error => {
        console.error('Error al obtener la lista de empleados:', error);
        MySwal.fire({
            icon: 'error',
            title: '¡Error al obtener la lista de empleados!',
            text: 'Ocurrió un error al intentar obtener la lista de empleados. Por favor, inténtalo de nuevo más tarde.',
        });
    });
}



  const updateProducto = () => {
    Axios.put(`http://localhost:3001/productos/${idProducto}`, {
      nombre,
      descripcion,
      precio,
      cantidad,
      talla,
      color,
      proveedor,
    }).then(() => {
      getProductos();
      MySwal.fire({
        icon: 'success',
        title: '¡Producto actualizado correctamente!',
      });
    });
  };

  const editarProducto = (producto) => {
    setEditar(true);
    setIdProducto(producto.ID_Producto);
    setNombre(producto.Nombre);
    setDescripcion(producto.Descripcion);
    setPrecio(producto.Precio);
    setCantidad(producto.Cantidad_Disponible);
    setTalla(producto.Talla);
    setColor(producto.Color);
    setProveedor(producto.Proveedor);
  };

  const deleteProducto = (id) => {
    Axios.delete(`http://localhost:3001/productos/${id}`)
      .then(() => {
        setEditar(false);
        getProductos();
        MySwal.fire({
          icon: 'success',
          title: '¡Producto eliminado correctamente!',
        });
      })
      .catch((error) => {
        console.error('Error al eliminar producto:', error);
      });
  };

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">GESTIÓN DE PRODUCTOS</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text">Nombre:</span>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          {/* Resto de campos de entrada de datos */}
          <div className="input-group mb-3">
                <span className="input-group-text">Cantidad Disponible</span>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Ingrese la cantidad disponible"
                    aria-label="Cantidad Disponible"
                    aria-describedby="basic-addon1"
                    value={cantidad}
                    onChange={(event) => setCantidad(event.target.value)}
                />
                </div>
                <div className="input-group mb-3">
                <span className="input-group-text">Talla</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Ingrese la talla"
                    aria-label="Talla"
                    aria-describedby="basic-addon1"
                    value={talla}
                    onChange={(event) => setTalla(event.target.value)}
                />
                </div>
                <div className="input-group mb-3">
                <span className="input-group-text">Color</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Ingrese el color"
                    aria-label="Color"
                    aria-describedby="basic-addon1"
                    value={color}
                    onChange={(event) => setColor(event.target.value)}
                />
                </div>
                <div className="input-group mb-3">
                <span className="input-group-text">Proveedor</span>
                <select
                    className="form-select"
                    aria-label="Seleccione Proveedor"
                    value={proveedor}
                    onChange={(event) => setProveedor(event.target.value)}
                >
                    <option value="">Seleccione Proveedor</option>
                    {empleadosList.map((empleado) => (
                        <option key={empleado.ID_Empleado} value={empleado.ID_Empleado}>
                            {empleado.Nombre} {empleado.Apellido}
                        </option>
                    ))}
                </select>
        </div>
        </div>
        <div className="card-footer text-muted">
          {editar ? (
            <div>
              <button className="btn btn-warning m-2" onClick={updateProducto}>
                Actualizar
              </button>
              <button className="btn btn-info m-2" onClick={() => setEditar(false)}>
                Cancelar
              </button>
            </div>
          ) : (
            <button className="btn btn-success" onClick={addProducto}>
              Registrar
            </button>
          )}
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad_Disponible</th>
            <th scope="col">Talla</th>
            <th scope="col">Proveedor</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosList.map((producto) => (
            <tr key={producto.ID_Producto}>
              <th scope="row">{producto.ID_Producto}</th>
              <td>{producto.Nombre}</td>
              <td>{producto.Descripcion}</td>
              <td>{producto.Precio}</td>
              <td>{producto.Cantidad_Disponible}</td>
              <td>{producto.Talla}</td>
              <td>{producto.Color}</td>
              <td>{producto.Proveedor}</td>
              <td>
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    onClick={() => editarProducto(producto)}
                    className="btn btn-info"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteProducto(producto.ID_Producto)}
                    className="btn btn-danger"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Productos;